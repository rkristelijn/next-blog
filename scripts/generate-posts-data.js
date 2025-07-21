import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


const POSTS_DIRECTORY = path.join(process.cwd(), 'src/content/posts');
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/posts.json');

// Ensure the data directory exists
const dataDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function generatePostsData() {
  try {
    console.log('Generating posts data...');
    
    // Read all MDX files
    const fileNames = fs.readdirSync(POSTS_DIRECTORY);
    const mdxFiles = fileNames.filter(fileName => fileName.endsWith('.mdx'));
    
    const posts = mdxFiles.map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(POSTS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        id: slug,
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content
      };
    }).filter(post => post.title && post.date && post.excerpt);
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Generate slugs array
    const slugs = posts.map(post => post.slug);
    
    // Create the data object
    const postsData = {
      posts,
      slugs,
      generatedAt: new Date().toISOString()
    };
    
    // Write to JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(postsData, null, 2));
    
    console.log(`✅ Generated posts data with ${posts.length} posts`);
    console.log(`📁 Output: ${OUTPUT_FILE}`);
    
    return postsData;
  } catch (error) {
    console.error('❌ Error generating posts data:', error);
    process.exit(1);
  }
}

// Run if called directly
generatePostsData(); 