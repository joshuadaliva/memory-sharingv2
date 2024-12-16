import * as SQLite from 'expo-sqlite'



const createDbTable = async () => {
  try{
    const db = await SQLite.openDatabaseAsync("memorySharing")
    console.log("database created")
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS memory_users(
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            profile_pic TEXT
        )   
    `)
    console.log("users table created")
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS posts(
            post_id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT NOT NULL,
            title TEXT NOT NULL,
            caption TEXT NOT NULL,
            location TEXT NOT NULL,
            user_id INTEGER NO NULL,
            FOREIGN KEY(user_id) REFERENCES memory_users(user_id)
        )   
    `)
    console.log("post table created")
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS favorites(
            favorite_id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT NOT NULL,
            title TEXT NOT NULL,
            caption TEXT NOT NULL,
            location TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            post_id INTGER NOT NULL,
            FOREIGN KEY(user_id) REFERENCES memory_users(user_id)
            FOREIGN KEY(post_id) REFERENCES posts(post_id)
        )   
    `)
    console.log("table favorites created")
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS notification(
            notification_id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            created_at TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY(user_id) REFERENCES memory_users(user_id)
        )   
    `)
    console.log("notifications created")
    return true
  }catch(error){
    console.log(error)
    return false
  }
}

export default createDbTable
