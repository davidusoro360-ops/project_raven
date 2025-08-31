# CourseModal Component

A comprehensive modal component that displays detailed course information in a professional, desktop-style layout.

## Features

- **2x2 Grid Layout**: Organized sections for optimal information display
- **Professional Design**: Black color scheme with muted pastels
- **Responsive**: Adapts to different screen sizes
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Interactive Elements**: Hover effects, smooth animations

## Usage

```tsx
import { CourseModal } from '@/components/molecules/CourseModal';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <CourseModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      course={selectedCourse}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls modal visibility |
| `onClose` | `() => void` | Yes | Callback when modal is closed |
| `course` | `Course \| null` | Yes | Course data to display |

## Layout Structure

### Top Row (3 columns)
1. **Schedule Section** - Class times, days, venue + View on Map button
2. **Instructor Section** - Professor info with avatar and contact
3. **Course Details Section** - Credits, department, semester info

### Bottom Row (2 columns)
1. **Course Outline Section** - Module breakdown with timeline
2. **Past Questions Section** - Practice materials and resources

### Footer
- **Join Class Button** - Primary action for enrollment

## Responsive Behavior

- **Desktop (1024px+)**: Full 2x2 grid layout
- **Tablet (768px-1024px)**: Top row becomes 2 columns, bottom row stacks
- **Mobile (<768px)**: All sections stack vertically

## Accessibility Features

- ARIA labels and roles
- Keyboard navigation (Escape to close)
- Focus management
- Screen reader friendly structure
- Proper contrast ratios

## Styling

Uses Tailwind CSS with custom utility classes:
- `animate-fade-in` - Backdrop animation
- `animate-slide-up` - Modal entrance animation
- `card-hover` - Interactive hover effects

## Dependencies

- React 18+
- Lucide React (icons)
- clsx (conditional classes)
- Tailwind CSS

## Related Components

- `Avatar` - User profile images
- `Badge` - Information tags
- `Button` - Interactive elements

## Version History

- **v1.0.0** - Initial implementation with 2x2 grid layout
- **v1.1.0** - Added View on Map button to schedule section
- **v1.2.0** - Enhanced accessibility and documentation
