const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://tony2:3Rgh29LE5wM9pT8@cluster0.0eream7.mongodb.net/weatherApp?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  console.log('🌍 Starting MongoDB connection...');
  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected!');
    
    console.log('📡 Sending ping...');
    const result = await client.db('admin').command({ ping: 1 });
    console.log('🎉 Ping result:', result);
  } catch (err) {
    console.error('❌ Connection failed:', err);
  } finally {
    console.log('🛑 Closing client...');
    await client.close();
    console.log('👋 Done.');
  }
}

run();

