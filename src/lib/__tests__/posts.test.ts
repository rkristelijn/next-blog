/**
 * Tests for posts library functions
 */

import { describe, it, expect } from 'vitest';
import { getAllPosts, getPostBySlug, getAllPostSlugs, postExists } from '../posts';

describe('posts library', () => {
  describe('getAllPosts', () => {
    it('returns all posts', () => {
      const posts = getAllPosts();
      
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0]).toHaveProperty('id');
      expect(posts[0]).toHaveProperty('title');
      expect(posts[0]).toHaveProperty('slug');
      expect(posts[0]).toHaveProperty('content');
      expect(posts[0]).toHaveProperty('date');
      expect(posts[0]).toHaveProperty('excerpt');
    });

    it('returns posts in correct order (newest first)', () => {
      const posts = getAllPosts();
      
      if (posts.length > 1) {
        // Posts should be ordered by date (newest first)
        const firstDate = new Date(posts[0].date);
        const secondDate = new Date(posts[1].date);
        expect(firstDate.getTime()).toBeGreaterThanOrEqual(secondDate.getTime());
      }
    });
  });

  describe('getPostBySlug', () => {
    it('returns correct post for valid slug', () => {
      const posts = getAllPosts();
      if (posts.length > 0) {
        const firstPost = posts[0];
        const post = getPostBySlug(firstPost.slug);
        
        expect(post).toMatchObject({
          id: firstPost.id,
          title: firstPost.title,
          slug: firstPost.slug,
        });
      }
    });

    it('returns undefined for invalid slug', () => {
      const post = getPostBySlug('non-existent-slug');
      
      expect(post).toBeUndefined();
    });

    it('handles empty slug', () => {
      const post = getPostBySlug('');
      
      expect(post).toBeUndefined();
    });
  });

  describe('getAllPostSlugs', () => {
    it('returns all post slugs', () => {
      const posts = getAllPosts();
      const slugs = getAllPostSlugs();
      
      expect(slugs).toHaveLength(posts.length);
      
      // Check that all slugs from posts are included
      posts.forEach(post => {
        expect(slugs).toContain(post.slug);
      });
    });

    it('returns unique slugs', () => {
      const slugs = getAllPostSlugs();
      const uniqueSlugs = [...new Set(slugs)];
      
      expect(slugs).toHaveLength(uniqueSlugs.length);
    });
  });

  describe('postExists', () => {
    it('returns true for existing post', () => {
      const posts = getAllPosts();
      if (posts.length > 0) {
        expect(postExists(posts[0].slug)).toBe(true);
      }
    });

    it('returns false for non-existing post', () => {
      expect(postExists('non-existent-slug')).toBe(false);
    });

    it('returns false for empty slug', () => {
      expect(postExists('')).toBe(false);
    });

    it('handles null and undefined', () => {
      expect(postExists(null as unknown as string)).toBe(false);
      expect(postExists(undefined as unknown as string)).toBe(false);
    });
  });
});
