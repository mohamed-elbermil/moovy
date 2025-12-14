import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'moovy';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Pas d'assertion au chargement pour éviter les erreurs de build

export async function POST(request: NextRequest) {
  try {
    if (!MONGODB_URI) {
      return NextResponse.json(
        { error: 'Configuration serveur manquante (MONGODB_URI)' },
        { status: 500 }
      );
    }

    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; name: string };
    const { movieId, title, poster_path, release_date } = await request.json();

    if (!movieId || !title) {
      return NextResponse.json(
        { error: 'Données du film requises' },
        { status: 400 }
      );
    }

    const client = new MongoClient(MONGODB_URI!);
    await client.connect();

    const db = client.db(MONGODB_DB);
    const users = db.collection('users');

    const movieData = {
      movieId,
      title,
      poster_path,
      release_date,
      watchedAt: new Date()
    };

    // Ajouter le film à l'historique (éviter les doublons)
    await users.updateOne(
      { _id: new ObjectId(decoded.userId) },
      { 
        $addToSet: { watchedMovies: movieData },
        $set: { updatedAt: new Date() }
      }
    );

    await client.close();

    return NextResponse.json({
      message: 'Film ajouté à l\'historique'
    });

  } catch (error) {
    console.error('Erreur lors de l\'ajout du film:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!MONGODB_URI) {
      return NextResponse.json(
        { error: 'Configuration serveur manquante (MONGODB_URI)' },
        { status: 500 }
      );
    }

    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; name: string };

    const client = new MongoClient(MONGODB_URI!);
    await client.connect();

    const db = client.db(MONGODB_DB);
    const users = db.collection('users');

    const user = await users.findOne(
      { _id: new ObjectId(decoded.userId) },
      { projection: { watchedMovies: 1 } }
    );

    await client.close();

    return NextResponse.json({
      watchedMovies: user?.watchedMovies || []
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
