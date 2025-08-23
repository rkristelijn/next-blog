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

/**
 * Convert a string to a URL-friendly slug
 * @param {string} text - The text to convert
 * @returns {string} - URL-friendly slug
 */
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars except hyphens
    .replace(/\-\-+/g, '-')         // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')             // Trim hyphens from start
    .replace(/-+$/, '');            // Trim hyphens from end
}

function generatePostsData() {
  try {
    console.log('Generating posts data...');
    
    // Read all MDX files
    const fileNames = fs.readdirSync(POSTS_DIRECTORY);
    const mdxFiles = fileNames.filter(fileName => fileName.endsWith('.mdx'));
    
    const posts = mdxFiles.map(fileName => {
      const fileSlug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(POSTS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Create URL-friendly slug from title if available, otherwise from filename
      const urlSlug = data.title ? createSlug(data.title) : createSlug(fileSlug);
      
      return {
        id: fileSlug,           // Keep original filename as ID for sorting
        slug: urlSlug,          // Use URL-friendly slug for routing
        title: data.title,
        date: data.date,
        author: data.author,
        excerpt: data.excerpt,
        content,
        originalFilename: fileName  // Keep track of original filename
      };
    }).filter(post => post.title && post.date && post.excerpt);
    
    // Sort by filename (numerical order)
    posts.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
    
    // Generate slugs array
    const slugs = posts.map(post => post.slug);
    
    // Check for duplicate slugs
    const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
    if (duplicateSlugs.length > 0) {
      console.warn('⚠️  Warning: Duplicate slugs found:', duplicateSlugs);
      console.warn('   Consider renaming files or titles to avoid conflicts');
    }
    
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
    
    // Log slug transformations for debugging
    posts.forEach(post => {
      if (post.id !== post.slug) {
        console.log(`🔄 Slug transformation: "${post.id}" → "${post.slug}"`);
      }
    });
    
    return postsData;
  } catch (error) {
    console.error('❌ Error generating posts data:', error);
    process.exit(1);
  }
}

// Run if called directly
generatePostsData(); 