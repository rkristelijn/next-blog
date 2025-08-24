'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  InputAdornment,
  Chip,
  Typography,
  Collapse,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import type { Post } from '@/types';

export type SortOption = 
  | 'date-desc'      // Newest first (default)
  | 'date-asc'       // Oldest first
  | 'title-asc'      // A-Z
  | 'title-desc'     // Z-A
  | 'filename-desc'  // Filename Z-A (reversed, default for filename)
  | 'filename-asc';  // Filename A-Z (normal)

interface PostsFilterProps {
  posts: Omit<Post, 'content'>[];
  onFilteredPostsChange: (filteredPosts: Omit<Post, 'content'>[]) => void;
}

export default function PostsFilter({ posts, onFilteredPostsChange }: PostsFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoize filtered and sorted posts to prevent unnecessary recalculations
  const filteredAndSortedPosts = useMemo(() => {
    let filteredPosts = [...posts];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.author.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filteredPosts.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'filename-desc':
          // Reversed filename sort (default for filename)
          return (b.originalFilename || '').localeCompare(a.originalFilename || '');
        case 'filename-asc':
          // Normal filename sort
          return (a.originalFilename || '').localeCompare(b.originalFilename || '');
        default:
          return 0;
      }
    });

    return filteredPosts;
  }, [posts, searchTerm, sortBy]);

  // Use useCallback to prevent unnecessary re-renders of parent component
  const stableOnFilteredPostsChange = useCallback(onFilteredPostsChange, [onFilteredPostsChange]);

  // Only call the callback when the filtered posts actually change
  useEffect(() => {
    stableOnFilteredPostsChange(filteredAndSortedPosts);
  }, [filteredAndSortedPosts, stableOnFilteredPostsChange]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
      // Escape to clear search
      if (event.key === 'Escape' && searchTerm) {
        setSearchTerm('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchTerm]);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const getSortLabel = useCallback((option: SortOption): string => {
    switch (option) {
      case 'date-desc': return 'Newest first';
      case 'date-asc': return 'Oldest first';
      case 'title-asc': return 'Title A-Z';
      case 'title-desc': return 'Title Z-A';
      case 'filename-desc': return 'Filename Z-A (reversed)';
      case 'filename-asc': return 'Filename A-Z (normal)';
      default: return '';
    }
  }, []);

  const getResultsText = useMemo((): string => {
    const total = posts.length;
    const filtered = filteredAndSortedPosts.length;

    if (searchTerm.trim() && filtered !== total) {
      return `${filtered} of ${total} posts`;
    }
    return `${total} posts`;
  }, [posts.length, filteredAndSortedPosts.length, searchTerm]);

  const hasActiveFilters = searchTerm.trim() !== '' || sortBy !== 'date-desc';

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        mb: 4,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
        border: hasActiveFilters ? 2 : 1,
        borderColor: hasActiveFilters ? 'primary.main' : 'divider',
        transition: 'border-color 0.2s ease'
      }}
    >
      {/* Compact Header */}
      <Box 
        sx={{ 
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon color="primary" />
          <Typography variant="h6" component="h2">
            Filter & Sort
          </Typography>
          {hasActiveFilters && (
            <Chip 
              label="Active"
              color="primary"
              size="small"
              variant="filled"
            />
          )}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label={getResultsText}
            color="secondary"
            variant="outlined"
            size="small"
          />
          <Tooltip title={isExpanded ? "Collapse" : "Expand"}>
            <IconButton size="small">
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Expandable Controls */}
      <Collapse in={isExpanded}>
        <Box sx={{ p: 3, pt: 0, borderTop: 1, borderColor: 'divider' }}>
          {/* Controls */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: { xs: 'stretch', sm: 'flex-start' },
            mb: 2
          }}>
            {/* Search */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search in title, description or author... (Ctrl+K)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <Tooltip title="Clear (Esc)">
                      <IconButton size="small" onClick={handleClearSearch}>
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1 }}
            />

            {/* Sort */}
            <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <MenuItem value="date-desc">📅 Newest first</MenuItem>
                <MenuItem value="date-asc">📅 Oldest first</MenuItem>
                <MenuItem value="title-asc">🔤 Title A-Z</MenuItem>
                <MenuItem value="title-desc">🔤 Title Z-A</MenuItem>
                <MenuItem value="filename-desc">📄 Filename Z-A (reversed)</MenuItem>
                <MenuItem value="filename-asc">📄 Filename A-Z (normal)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Active Filters */}
          {hasActiveFilters && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" color="text.secondary">
                Active filters:
              </Typography>
              {sortBy !== 'date-desc' && (
                <Chip 
                  label={getSortLabel(sortBy)}
                  color="secondary"
                  variant="outlined"
                  size="small"
                  onDelete={() => setSortBy('date-desc')}
                />
              )}
              {searchTerm && (
                <Chip 
                  label={`"${searchTerm}"`}
                  color="info"
                  variant="outlined"
                  size="small"
                  onDelete={handleClearSearch}
                />
              )}
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
}
