import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FAQSection } from '@/components/pages/FAQSection';

const mockFAQs = [
  {
    id: '1',
    question: 'How do I get a quote?',
    answer: 'You can get a quote by filling out our form or calling us.',
    category: 'Getting Started',
  },
  {
    id: '2',
    question: 'Are you licensed?',
    answer: 'Yes, we are fully licensed and insured.',
    category: 'Company Information',
  },
  {
    id: '3',
    question: 'What areas do you serve?',
    answer: 'We serve Salt Lake County and surrounding areas.',
    category: 'Service Areas',
  },
  {
    id: '4',
    question: 'Do you offer warranties?',
    answer: 'Yes, we offer comprehensive warranties on all work.',
    category: 'Company Information',
  },
];

describe('FAQSection', () => {
  describe('Component Rendering', () => {
    it('renders with default props and default FAQs', () => {
      render(<FAQSection />);

      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
      expect(
        screen.getByText('Get answers to common questions about our services and process.')
      ).toBeInTheDocument();

      // Should render some default FAQs
      expect(screen.getByText(/how do i get a quote for my project/i)).toBeInTheDocument();
      expect(screen.getByText(/are you licensed and insured/i)).toBeInTheDocument();
    });

    it('renders with custom props', () => {
      const customTitle = 'Custom FAQ Title';
      const customSubtitle = 'Custom FAQ Subtitle';

      render(<FAQSection faqs={mockFAQs} title={customTitle} subtitle={customSubtitle} />);

      expect(screen.getByText(customTitle)).toBeInTheDocument();
      expect(screen.getByText(customSubtitle)).toBeInTheDocument();
    });

    it('renders custom FAQs when provided', () => {
      render(<FAQSection faqs={mockFAQs} />);

      expect(screen.getByText('How do I get a quote?')).toBeInTheDocument();
      expect(screen.getByText('Are you licensed?')).toBeInTheDocument();
      expect(screen.getByText('What areas do you serve?')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const customClass = 'custom-faq-class';
      const { container } = render(<FAQSection className={customClass} />);

      expect(container.firstChild).toHaveClass(customClass);
    });
  });

  describe('Accordion Functionality', () => {
    it('renders as accordion by default', () => {
      render(<FAQSection faqs={mockFAQs} />);

      // Questions should be clickable buttons
      const questionButtons = screen.getAllByRole('button');
      expect(questionButtons.length).toBeGreaterThan(0);

      // Answers should be hidden initially
      expect(
        screen.queryByText('You can get a quote by filling out our form or calling us.')
      ).not.toBeInTheDocument();
    });

    it('expands accordion item when clicked', () => {
      render(<FAQSection faqs={mockFAQs} />);

      const questionButton = screen.getByText('How do I get a quote?');
      fireEvent.click(questionButton);

      expect(
        screen.getByText('You can get a quote by filling out our form or calling us.')
      ).toBeInTheDocument();
    });

    it('collapses expanded accordion item when clicked again', () => {
      render(<FAQSection faqs={mockFAQs} />);

      const questionButton = screen.getByText('How do I get a quote?');

      // Expand
      fireEvent.click(questionButton);
      expect(
        screen.getByText('You can get a quote by filling out our form or calling us.')
      ).toBeInTheDocument();

      // Collapse
      fireEvent.click(questionButton);
      expect(
        screen.queryByText('You can get a quote by filling out our form or calling us.')
      ).not.toBeInTheDocument();
    });

    it('allows multiple items to be open simultaneously', () => {
      render(<FAQSection faqs={mockFAQs} />);

      const question1 = screen.getByText('How do I get a quote?');
      const question2 = screen.getByText('Are you licensed?');

      // Open both items
      fireEvent.click(question1);
      fireEvent.click(question2);

      // Both answers should be visible
      expect(
        screen.getByText('You can get a quote by filling out our form or calling us.')
      ).toBeInTheDocument();
      expect(screen.getByText('Yes, we are fully licensed and insured.')).toBeInTheDocument();
    });

    it('opens items specified in defaultOpen prop', () => {
      render(<FAQSection faqs={mockFAQs} defaultOpen={['1', '2']} />);

      // Items with IDs '1' and '2' should be open by default
      expect(
        screen.getByText('You can get a quote by filling out our form or calling us.')
      ).toBeInTheDocument();
      expect(screen.getByText('Yes, we are fully licensed and insured.')).toBeInTheDocument();
    });

    it('shows category tags when available', () => {
      render(<FAQSection faqs={mockFAQs} />);

      // Expand an item to see the category
      const questionButton = screen.getByText('Are you licensed?');
      fireEvent.click(questionButton);

      expect(screen.getByText('Company Information')).toBeInTheDocument();
    });
  });

  describe('Grid Variant', () => {
    it('renders as grid when variant is set to grid', () => {
      render(<FAQSection faqs={mockFAQs} variant="grid" />);

      // All questions and answers should be visible
      mockFAQs.forEach((faq) => {
        expect(screen.getByText(faq.question)).toBeInTheDocument();
        expect(screen.getByText(faq.answer)).toBeInTheDocument();
      });
    });

    it('shows categories in grid variant', () => {
      render(<FAQSection faqs={mockFAQs} variant="grid" />);

      expect(screen.getByText('Getting Started')).toBeInTheDocument();
      expect(screen.getAllByText('Company Information')).toHaveLength(2); // Two FAQs have this category
      expect(screen.getByText('Service Areas')).toBeInTheDocument();
    });
  });

  describe('List Variant', () => {
    it('renders as list when variant is set to list', () => {
      render(<FAQSection faqs={mockFAQs} variant="list" />);

      // All questions and answers should be visible
      mockFAQs.forEach((faq) => {
        expect(screen.getByText(faq.question)).toBeInTheDocument();
        expect(screen.getByText(faq.answer)).toBeInTheDocument();
      });
    });
  });

  describe('Search Functionality', () => {
    it('shows search input when searchable is true', () => {
      render(<FAQSection faqs={mockFAQs} searchable={true} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      expect(searchInput).toBeInTheDocument();
    });

    it('filters FAQs based on question text', () => {
      render(<FAQSection faqs={mockFAQs} searchable={true} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      fireEvent.change(searchInput, { target: { value: 'licensed' } });

      // Should show matching FAQ
      expect(screen.getByText('Are you licensed?')).toBeInTheDocument();

      // Should not show non-matching FAQs
      expect(screen.queryByText('How do I get a quote?')).not.toBeInTheDocument();
      expect(screen.queryByText('What areas do you serve?')).not.toBeInTheDocument();
    });

    it('filters FAQs based on answer text', () => {
      render(<FAQSection faqs={mockFAQs} searchable={true} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      fireEvent.change(searchInput, { target: { value: 'Salt Lake' } });

      // Should show FAQ with matching answer
      expect(screen.getByText('What areas do you serve?')).toBeInTheDocument();

      // Should not show non-matching FAQs
      expect(screen.queryByText('How do I get a quote?')).not.toBeInTheDocument();
    });

    it('shows no results message when search yields no matches', () => {
      render(<FAQSection faqs={mockFAQs} searchable={true} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      fireEvent.change(searchInput, { target: { value: 'nonexistent query' } });

      expect(screen.getByText('No FAQs match your search criteria.')).toBeInTheDocument();
    });

    it('is case insensitive', () => {
      render(<FAQSection faqs={mockFAQs} searchable={true} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      fireEvent.change(searchInput, { target: { value: 'LICENSED' } });

      expect(screen.getByText('Are you licensed?')).toBeInTheDocument();
    });
  });

  describe('Category Filtering', () => {
    it('shows category dropdown when categorized is true', () => {
      render(<FAQSection faqs={mockFAQs} categorized={true} />);

      const categorySelect = screen.getByDisplayValue('All Categories');
      expect(categorySelect).toBeInTheDocument();

      // Should have options for all categories
      const options = within(categorySelect).getAllByRole('option');
      expect(options).toHaveLength(4); // All Categories + 3 unique categories
    });

    it('filters FAQs by selected category', () => {
      render(<FAQSection faqs={mockFAQs} categorized={true} />);

      const categorySelect = screen.getByDisplayValue('All Categories');
      fireEvent.change(categorySelect, { target: { value: 'Company Information' } });

      // Should show FAQs from selected category
      expect(screen.getByText('Are you licensed?')).toBeInTheDocument();
      expect(screen.getByText('Do you offer warranties?')).toBeInTheDocument();

      // Should not show FAQs from other categories
      expect(screen.queryByText('How do I get a quote?')).not.toBeInTheDocument();
      expect(screen.queryByText('What areas do you serve?')).not.toBeInTheDocument();
    });

    it('shows all FAQs when "All Categories" is selected', () => {
      render(<FAQSection faqs={mockFAQs} categorized={true} />);

      const categorySelect = screen.getByDisplayValue('All Categories');

      // Change to specific category first
      fireEvent.change(categorySelect, { target: { value: 'Company Information' } });

      // Change back to all categories
      fireEvent.change(categorySelect, { target: { value: 'all' } });

      // All FAQs should be visible
      mockFAQs.forEach((faq) => {
        expect(screen.getByText(faq.question)).toBeInTheDocument();
      });
    });
  });

  describe('Combined Search and Category Filtering', () => {
    it('applies both search and category filters simultaneously', () => {
      render(<FAQSection faqs={mockFAQs} searchable={true} categorized={true} />);

      // Filter by category
      const categorySelect = screen.getByDisplayValue('All Categories');
      fireEvent.change(categorySelect, { target: { value: 'Company Information' } });

      // Then search within that category
      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      fireEvent.change(searchInput, { target: { value: 'licensed' } });

      // Should show only the FAQ that matches both filters
      expect(screen.getByText('Are you licensed?')).toBeInTheDocument();
      expect(screen.queryByText('Do you offer warranties?')).not.toBeInTheDocument();
    });
  });

  describe('Call to Action Section', () => {
    it('renders call-to-action section', () => {
      render(<FAQSection faqs={mockFAQs} />);

      expect(screen.getByText('Still Have Questions?')).toBeInTheDocument();
      expect(screen.getByText(/our team is here to help/i)).toBeInTheDocument();

      // Should have contact buttons
      expect(screen.getByText('Call Us Now')).toBeInTheDocument();
      expect(screen.getByText('Send Message')).toBeInTheDocument();
    });

    it('has proper links in call-to-action buttons', () => {
      render(<FAQSection faqs={mockFAQs} />);

      const callButton = screen.getByText('Call Us Now');
      const messageButton = screen.getByText('Send Message');

      expect(callButton.closest('a')).toHaveAttribute('href', 'tel:+1234567890');
      expect(messageButton.closest('a')).toHaveAttribute('href', '/contact');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<FAQSection faqs={mockFAQs} />);

      const mainHeading = screen.getByRole('heading', { level: 2 });
      expect(mainHeading).toHaveTextContent('Frequently Asked Questions');

      const subHeading = screen.getByRole('heading', { level: 3 });
      expect(subHeading).toHaveTextContent('Still Have Questions?');
    });

    it('has proper ARIA attributes for accordion', () => {
      render(<FAQSection faqs={mockFAQs} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-expanded');
      });
    });

    it('updates aria-expanded when accordion items are toggled', () => {
      render(<FAQSection faqs={mockFAQs} />);

      const questionButton = screen.getByText('How do I get a quote?');

      // Initially collapsed
      expect(questionButton).toHaveAttribute('aria-expanded', 'false');

      // Expand
      fireEvent.click(questionButton);
      expect(questionButton).toHaveAttribute('aria-expanded', 'true');

      // Collapse
      fireEvent.click(questionButton);
      expect(questionButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('has proper labels for form controls', () => {
      render(<FAQSection faqs={mockFAQs} searchable={true} categorized={true} />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      expect(searchInput).toBeInTheDocument();

      const categorySelect = screen.getByDisplayValue('All Categories');
      expect(categorySelect).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty FAQ array', () => {
      render(<FAQSection faqs={[]} />);

      expect(screen.getByText('No FAQs match your search criteria.')).toBeInTheDocument();
    });

    it('handles FAQs without categories', () => {
      const faqsWithoutCategories = [
        {
          id: '1',
          question: 'Test Question',
          answer: 'Test Answer',
        },
      ];

      render(<FAQSection faqs={faqsWithoutCategories} />);

      expect(screen.getByText('Test Question')).toBeInTheDocument();
    });

    it('handles very long FAQ content', () => {
      const longContentFAQ = [
        {
          id: '1',
          question: 'A'.repeat(200),
          answer: 'B'.repeat(1000),
          category: 'Test',
        },
      ];

      render(<FAQSection faqs={longContentFAQ} />);

      expect(screen.getByText('A'.repeat(200))).toBeInTheDocument();
    });
  });
});
