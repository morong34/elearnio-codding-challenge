# Product Dashboard - Angular Coding Challenge

A single-page product dashboard built with Angular where users can view products, filter them, and manage a shopping cart.

## Features

### Core Features
- **Product List**: Responsive grid layout showing products with images, titles, prices, and "Add to Cart" buttons
- **Filtering**: Filter products by category and price range
- **Cart Management**: Add/remove items, update quantities, view cart summary
- **Data Persistence**: Cart items are saved in localStorage and persist on page reload

### Bonus Features
- **Sort by Price**: Toggle between ascending and descending price sorting
- **Search by Keyword**: Search products by title or category
- **Lazy Loading Images**: Images use the `loading="lazy"` attribute for better performance
- **Animations**: Smooth transitions for cart sidebar, hover effects on products, and feedback animations when adding to cart

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd elearnio-codding-challenge
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   ng serve
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

## Project Structure

- `src/app/core`: Core components, services, and models
  - `components`: Reusable UI components (header)
- `src/app/features`: Feature modules
  - `product-list`: Product display and filtering
  - `cart`: Cart sidebar and management
- `src/app/shared`: Shared components, services, and models
  - `models`: TypeScript interfaces
  - `services`: Data and state management services
- `src/assets`: Static assets including mock data

## Implementation Details

### State Management
- Uses Angular's signal API for reactive state management
- Services provide centralized data access and manipulation

### Responsive Design
- Fully responsive layout that works on mobile, tablet, and desktop
- Adaptive UI elements that change based on screen size

### Performance Considerations
- Lazy loading of images
- Efficient filtering and sorting operations
- Optimized rendering with Angular's change detection

## Technologies Used

- Angular 20.1.0
- Angular Material
- RxJS
- TypeScript
- CSS with modern features (Grid, Flexbox, Variables)
