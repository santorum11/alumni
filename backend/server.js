const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
//const port = 3000;
const port = 3306;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// MySQL connection setup - update with your credentials
const connection = mysql.createConnection({
  // host: 'localhost',
  // user: 'root',
  // password: 'Abhi@123',
  // database: 'alumni_db'
  host: 'sql12.freesqldatabase.com',
  user: 'sql12804249',
  password: 'QTtXuwRfPU',
  database: 'sql12804249',
  port: 3306
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoint to save registration data
// app.post('/api/register', (req, res) => {
//   const data = req.body;

//   const sql = `INSERT INTO alumni_registration
//     (fullName, gender, dob, bloodGroup, foodPreference, contactNumber, emailId, currentAddress, 
//      yearOfAdmission, yearOfPassing, batch, occupation, organization, areaOfExpertise, 
//      mentorJuniors, donate, availableForReunion)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   const values = [
//     data.fullName, data.gender, data.dob, data.bloodGroup, data.foodPreference, data.contactNumber,
//     data.emailId, data.currentAddress, data.yearOfAdmission, data.yearOfPassing, data.batch, data.occupation,
//     data.organization, data.areaOfExpertise, data.mentorJuniors, data.donate, data.availableForReunion
//   ];

//   connection.query(sql, values, (err, results) => {
//     if (err) {
//       console.error('Error inserting data:', err);
//       res.status(500).send({ message: 'Failed to save registration data' });
//     } else {
//       res.status(200).send({ message: 'Registration saved successfully' });
//     }
//   });
// });

const jwt = require('jsonwebtoken'); // Install with npm install jsonwebtoken

const JWT_SECRET = 'yourVerySecretKeyValue';

app.post('/api/admin-login', (req, res) => {
  const { emailOrUsername, password } = req.body;
  const sql = `
    SELECT * FROM users
    WHERE (email = ? OR username = ?) AND password = ? AND isAdmin = 1
  `;
  connection.query(sql, [emailOrUsername, emailOrUsername, password], (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Server error' });
    } else if (results.length === 1) {
      // Generate JWT token
      const token = jwt.sign({ id: results[0].id, isAdmin: true }, JWT_SECRET, { expiresIn: '2h' });
      res.status(200).send({ message: 'Login successful', token });
    } else {
      res.status(401).send({ message: 'Invalid admin credentials' });
    }
  });
});


app.post('/api/user-register', (req, res) => {
  const { username, email, password } = req.body;
  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  connection.query(sql, [username, email, password], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).send({ message: 'Username or Email already exists' });
      } else {
        res.status(500).send({ message: 'Registration failed' });
      }
    } else {
      res.status(200).send({ message: 'User registered successfully' });
    }
  });
});

function authenticateAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).send({ message: 'Forbidden: No token' });

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).send({ message: 'Forbidden: Admin access required' });
    req.adminId = decoded.id;
    next();
  } catch (e) {
    res.status(403).send({ message: 'Forbidden: Invalid token' });
  }
}

app.get('/api/users', authenticateAdmin, (req, res) => {
  connection.query('SELECT * FROM alumni_registration', (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Server error' });
    } else {
      res.status(200).send(results);
    }
  });
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // folder to save images
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage: storage });

const profilePicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/profile-pics';
    // Make sure directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const profilePicUpload = multer({ storage: profilePicStorage });

// Ensure uploads folder exists
const fs = require('fs');
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// POST API to upload images (admin protected middleware can be added)
app.post('/api/upload-images', upload.array('images', 10), (req, res) => {
  // Images saved info in req.files
  if (!req.files) {
    return res.status(400).send({ message: 'No files uploaded.' });
  }

  // You can save file paths to DB if needed here

  res.status(200).send({ message: 'Images uploaded successfully', files: req.files });
});

app.get('/api/gallery-images', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send({ message: 'Unable to scan directory' });
    }
    // Filter only image files (jpg/jpeg/png/gif)
    const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    res.send(images);
  });
});

app.post('/api/register', profilePicUpload.single('profilePic'), (req, res) => {
  const data = req.body; // form fields
  const profilePicFile = req.file;

  // Construct your SQL and values including profilePic path if available
  const sql = `INSERT INTO alumni_registration
    (fullName, gender, dob, bloodGroup, foodPreference, contactNumber, emailId, currentAddress,
     yearOfAdmission, yearOfPassing, batch, occupation, organization, areaOfExpertise,
     mentorJuniors, donate, availableForReunion, profilePicPath)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const profilePicPath = profilePicFile ? profilePicFile.path : null;

  const values = [
    data.fullName, data.gender, data.dob, data.bloodGroup, data.foodPreference, data.contactNumber,
    data.emailId, data.currentAddress, data.yearOfAdmission, data.yearOfPassing, data.batch, data.occupation,
    data.organization, data.areaOfExpertise, data.mentorJuniors, data.donate, data.availableForReunion,
    profilePicPath
  ];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send({ message: 'Failed to save registration data' });
    } else {
      res.status(200).send({ message: 'Registration saved successfully' });
    }
  });
});

app.post('/api/contact', (req, res) => {
  const { fullName, email, subject, message } = req.body;
  const sql = `
    INSERT INTO contact_messages (full_name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;
  connection.query(sql, [fullName, email, subject, message], (err, results) => {
    if (err) {
      console.error('Error saving contact:', err);
      res.status(500).json({ message: 'Failed to save contact message' });
    } else {
      res.status(200).json({ message: 'Contact message sent successfully' });
    }
  });
});

// Get all blogs with comments and vote counts
// app.get('/api/blogs', (req, res) => {
//   const query = `
//     SELECT b.id, b.title, b.content, b.created_at,
//       (SELECT COUNT(*) FROM likes_dislikes WHERE post_type='blog' AND post_id=b.id AND vote='like') AS likesCount,
//       (SELECT COUNT(*) FROM likes_dislikes WHERE post_type='blog' AND post_id=b.id AND vote='dislike') AS dislikesCount
//     FROM blogs b
//     ORDER BY b.created_at DESC
//   `;

//   connection.query(query, (err, blogs) => {
//     if(err) return res.status(500).send(err);

//     // For each blog, get comments and their vote counts
//     const blogIds = blogs.map(b => b.id);
//     if (blogIds.length === 0) return res.json([]);

//     const commentsQuery = `
//       SELECT c.id, c.blog_id, c.comment, c.created_at,
//         (SELECT COUNT(*) FROM likes_dislikes WHERE post_type='comment' AND post_id=c.id AND vote='like') AS likesCount,
//         (SELECT COUNT(*) FROM likes_dislikes WHERE post_type='comment' AND post_id=c.id AND vote='dislike') AS dislikesCount
//       FROM comments c
//       WHERE c.blog_id IN (?)
//       ORDER BY c.created_at ASC
//     `;

//     connection.query(commentsQuery, [blogIds], (cErr, comments) => {
//       if (cErr) return res.status(500).send(cErr);

//       blogs.forEach(blog => {
//         blog.comments = comments.filter(c => c.blog_id === blog.id);
//       });

//       res.json(blogs);
//     });
//   });
// });

app.get('/api/blogs', (req, res) => {
  const sql = `
    SELECT b.id, b.title, b.content, b.created_at,
      (SELECT COUNT(*) FROM likes_dislikes WHERE post_type='blog' AND post_id=b.id AND vote='like') AS likesCount,
      (SELECT COUNT(*) FROM likes_dislikes WHERE post_type='blog' AND post_id=b.id AND vote='dislike') AS dislikesCount
    FROM blogs b
    WHERE approved = true
    ORDER BY b.created_at DESC
  `;

  connection.query(sql, (err, blogs) => {
    if (err) return res.status(500).send(err);

    const blogIds = blogs.map(b => b.id);
    if (blogIds.length === 0) return res.json([]);

    const commentsQuery = `
      SELECT c.id, c.blog_id, c.comment, c.created_at,
        (SELECT COUNT(*) FROM likes_dislikes WHERE post_type='comment' AND post_id=c.id AND vote='like') AS likesCount,
        (SELECT COUNT(*) FROM likes_dislikes WHERE post_type='comment' AND post_id=c.id AND vote='dislike') AS dislikesCount
      FROM comments c
      WHERE c.blog_id IN (?)
      ORDER BY c.created_at ASC
    `;

    connection.query(commentsQuery, [blogIds], (cErr, comments) => {
      if (cErr) return res.status(500).send(cErr);

      blogs.forEach(blog => {
        blog.comments = comments.filter(c => c.blog_id === blog.id);
      });

      res.json(blogs);
    });
  });
});

app.get('/api/admin/blogs', authenticateAdmin, (req, res) => {
  const sql = `
    SELECT b.id, b.title, b.content, b.created_at, b.approved,
      (SELECT COUNT(*) FROM likes_dislikes WHERE post_type='blog' AND post_id=b.id AND vote='like') AS likesCount,
      (SELECT COUNT(*) FROM likes_dislikes WHERE post_type='blog' AND post_id=b.id AND vote='dislike') AS dislikesCount
    FROM blogs b
    ORDER BY b.created_at DESC
  `;

  connection.query(sql, (err, blogs) => {
    if (err) return res.status(500).send(err);

    const blogIds = blogs.map(b => b.id);
    if (blogIds.length === 0) return res.json([]);

    const commentsQuery = `
      SELECT c.id, c.blog_id, c.comment, c.created_at,
        (SELECT COUNT(*) FROM likes_dislikes WHERE post_type='comment' AND post_id=c.id AND vote='like') AS likesCount,
        (SELECT COUNT(*) FROM likes_dislikes WHERE post_type='comment' AND post_id=c.id AND vote='dislike') AS dislikesCount
      FROM comments c
      WHERE c.blog_id IN (?)
      ORDER BY c.created_at ASC
    `;

    connection.query(commentsQuery, [blogIds], (cErr, comments) => {
      if (cErr) return res.status(500).send(cErr);

      blogs.forEach(blog => {
        blog.comments = comments.filter(c => c.blog_id === blog.id);
      });

      res.json(blogs);
    });
  });
});

// Post a new blog
app.post('/api/blogs', (req, res) => {
  const { title, content } = req.body;
  const sql = 'INSERT INTO blogs (title, content) VALUES (?, ?)';
  connection.query(sql, [title, content], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: 'Blog created', id: result.insertId });
  });
});

// Post a comment to a blog
app.post('/api/blogs/:id/comments', (req, res) => {
  const blogId = req.params.id;
  const { comment } = req.body;
  const sql = 'INSERT INTO comments (blog_id, comment) VALUES (?, ?)';
  connection.query(sql, [blogId, comment], (err) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: 'Comment added' });
  });
});

// Vote on blog or comment
app.post('/api/vote', (req, res) => {
  const { postId, postType, vote } = req.body;
  // Insert or update vote
  const findSql = 'SELECT id FROM likes_dislikes WHERE post_id = ? AND post_type = ?';
  connection.query(findSql, [postId, postType], (err, results) => {
    if(err) return res.status(500).send(err);

    if(results.length > 0) {
      // Update existing vote
      const sqlUpdate = 'UPDATE likes_dislikes SET vote = ? WHERE id = ?';
      connection.query(sqlUpdate, [vote, results[0].id], (updErr) => {
        if(updErr) return res.status(500).send(updErr);
        res.send({ message: 'Vote updated' });
      });
    } else {
      // Insert new vote
      const sqlInsert = 'INSERT INTO likes_dislikes (post_id, post_type, vote) VALUES (?, ?, ?)';
      connection.query(sqlInsert, [postId, postType, vote], (insErr) => {
        if(insErr) return res.status(500).send(insErr);
        res.send({ message: 'Vote added' });
      });
    }
  });
});


// Delete blog (admin only)
app.delete('/api/blogs/:id', authenticateAdmin, (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM blogs WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Blog deleted' });
  });
});

// Delete comment (admin only)
app.delete('/api/comments/:id', authenticateAdmin, (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM comments WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Comment deleted' });
  });
});

app.post('/api/donate', (req, res) => { 
  const { name, email, phone, amount, reference } = req.body;
const sql = "INSERT INTO donations (name, email, phone, amount, reference) VALUES (?, ?, ?, ?, ?)";
  connection.query(sql, [name, email, phone, amount, reference], (err) => {
    if (err) return res.status(500).send({ message: 'Failed to save donation' });
    res.status(200).send({ message: 'Donation saved' });
  });
});

app.post('/api/feedback', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).send({ message: "All fields required" });
  }
  const sql = "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)";
  connection.query(sql, [name, email, message], (err) => {
    if (err) return res.status(500).send({ message: 'Feedback save failed' });
    res.status(200).send({ message: 'Feedback received!' });
  });
});

app.patch('/api/blogs/:id/approve', authenticateAdmin, (req, res) => {
  const blogId = req.params.id;
  const sql = "UPDATE blogs SET approved = true WHERE id = ?";
  connection.query(sql, [blogId], (err) => {
    if (err) return res.status(500).send({ message: 'Error approving blog' });
    res.status(200).send({ message: 'Blog approved successfully' });
  });
});

const newsTableSql = `
  CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    content LONGTEXT,
    image_url VARCHAR(255),
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;
connection.query(newsTableSql, (err) => {
  if (err) console.error('Error creating news table:', err);
});

// Get published news (public)
app.get('/api/news', (req, res) => {
  const sql = 'SELECT * FROM news WHERE published = true ORDER BY created_at DESC';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get all news (admin)
app.get('/api/admin/news', authenticateAdmin, (req, res) => {
  const sql = 'SELECT * FROM news ORDER BY created_at DESC';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Create news
app.post('/api/news', authenticateAdmin, (req, res) => {
  const { title, category, content, image_url, published } = req.body;
  const sql = 'INSERT INTO news (title, category, content, image_url, published) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [title, category, content, image_url, published], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'News created', id: result.insertId });
  });
});

// Update news
app.put('/api/news/:id', authenticateAdmin, (req, res) => {
  const { title, category, content, image_url, published } = req.body;
  const sql = 'UPDATE news SET title=?, category=?, content=?, image_url=?, published=? WHERE id=?';
  connection.query(sql, [title, category, content, image_url, published, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'News updated' });
  });
});

// Publish/unpublish news
app.patch('/api/news/:id/publish', authenticateAdmin, (req, res) => {
  const { published } = req.body;
  const sql = 'UPDATE news SET published=? WHERE id=?';
  connection.query(sql, [published, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'News status updated' });
  });
});

// Delete news
app.delete('/api/news/:id', authenticateAdmin, (req, res) => {
  const sql = 'DELETE FROM news WHERE id=?';
  connection.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'News deleted' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
