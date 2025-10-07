# Frontend Code Documentation

## Overview
This document provides detailed documentation of the frontend code structure, components, and functionality.

---

## HTML Structure (luxy.html)

### Document Head
```html
- Meta tags for charset, viewport, and description
- Title: "Luxy - Beauty Salon"
- External libraries: Swiper, AOS, Font Awesome
- Google Fonts: Playfair Display, Montserrat
- Linked CSS: index.css
```

### Main Sections

#### 1. Preloader
```html
<div class="preloader">
  - Logo with pulse animation
  - Loading bar animation
  - Auto-hides after 600ms
```

#### 2. Header/Navigation
```html
<header class="header">
  - Fixed position navigation
  - Logo
  - Desktop menu (7 links)
  - Hamburger menu (mobile)
  - Theme toggle button
  - Smooth scroll functionality
```

#### 3. Hero Section
```html
<section class="hero">
  - Swiper slider with 3 slides
  - Full-screen images
  - Overlay content (title, subtitle, description)
  - CTA buttons
  - Navigation arrows (50px desktop, 40px mobile)
  - Pagination bullets (14px desktop, 12px mobile)
```

#### 4. About Section
```html
<section class="about">
  - Two-column grid layout
  - Image grid (2x2 images)
  - Text content with description
  - CTA button
  - Gap: 30px, Image height: 380px
```

#### 5. Team Section
```html
<section class="team">
  - Grid layout (auto-fill, min 280px)
  - Team member cards (4 members)
  - Hover effects
  - Social media links
```

#### 6. Services Section
```html
<section class="services">
  - Tabbed interface (7 service categories)
  - Each service includes:
    * Swiper image slider
    * Service name and price
    * Description
    * Book Now button
  - Services: Manicure, Pedicure, Facials, Massage, 
              Hair Services, Lash Extensions, Locs & Braids
```

#### 7. Gallery Section
```html
<section class="gallery">
  - Filter buttons (All, Nails, Hair, Facial, Massage)
  - Grid layout (auto-fill, min 300px)
  - Lightbox functionality
  - Hover overlay effects
```

#### 8. Booking Section
```html
<section class="booking">
  - Background image with overlay
  - Booking form:
    * Name, Email, Phone
    * Service selection dropdown
    * Date and Time pickers
    * Message textarea
    * Submit button
```

#### 9. Testimonials Section
```html
<section class="testimonials">
  - Swiper slider
  - Client cards with:
    * Photo
    * Star rating
    * Review text
    * Name and location
```

#### 10. Contact Section
```html
<section class="contact">
  - Two-column layout:
    * Contact form (left)
    * Map and contact details (right)
  - Business hours
  - Contact information
```

#### 11. Footer
```html
<footer class="footer">
  - Four columns:
    * About with logo
    * Quick links
    * Gallery grid
    * Contact info
  - Social media icons (360° rotation on hover)
  - Copyright notice
```

#### 12. Additional Elements
```html
- Back to top button (fixed, bottom-right)
- Success modal for form submissions
- PWA install banner
```

---

## CSS Architecture (index.css)

### CSS Variables
```css
:root {
  /* Colors */
  --color-black: #000000
  --color-gold: #D4AF37
  --color-pink: #FF69B4
  --color-white: #FFFFFF
  --color-gray: #F5F5F5
  --color-dark-gray: #333333
  
  /* Fonts */
  --font-heading: 'Playfair Display', serif
  --font-body: 'Montserrat', sans-serif
  
  /* Transition */
  --transition: all 0.3s ease
}
```

### Dark Theme Variables
```css
.dark-theme {
  --color-dark-gray: #f1f1f1
  --color-white: #121212
  --color-background: #1a1a1a
  --color-text: #f1f1f1
  --color-gray: #2a2a2a
}
```

### Layout Specifications

#### Header
- **Desktop padding**: 8px 0
- **Scrolled padding**: 5px 0
- **Mobile padding**: 10px 0
- **Logo size**: 120x50px (desktop), 100x40px (mobile)

#### Sections
- **Desktop padding**: 60px 0
- **Tablet padding**: 80px 0
- **Mobile padding**: 60px 0

#### Container
- **Width**: 90% max-width 1200px
- **Horizontal padding**: 0 15px

#### Hero Slider Buttons
- **Desktop**: 50x50px, font-size 20px
- **Mobile**: 40x40px, font-size 16px
- **Background**: rgba(0, 0, 0, 0.5)
- **Border**: 2px solid gold
- **Hover**: Gold background, scale 1.1x

#### Pagination Bullets
- **Desktop**: 14x14px
- **Mobile**: 12x12px
- **Active**: Scale 1.3x, gold glow

### Responsive Breakpoints
```css
@media (max-width: 1024px) - Tablet
@media (max-width: 992px)  - Small tablet
@media (max-width: 768px)  - Mobile
@media (max-width: 576px)  - Small mobile
```

### Key Animations

#### Preloader
```css
- Pulse animation: 1s infinite
- Scale: 1 → 1.15 → 1
- Opacity: 0.8 → 0.5 → 0.8
- Loading bar: 0.8s infinite slide
```

#### Navigation
```css
- Link underline: Width 0 → 100%
- Hover lift: translateY(-2px)
- Text glow: 0 0 15px rgba(gold, 0.8)
```

#### Cards & Images
```css
- Hover scale: 1.05x
- Hover lift: translateY(-10px)
- Transition: 0.3s - 0.5s ease
```

#### Social Icons
```css
- Hover rotation: 360deg
- Hover lift: translateY(-8px)
- Background gradient scale: 0 ��� 1
- Glow shadow: 0 10px 25px rgba(gold, 0.5)
```

### Dark Theme Styling

#### Section Backgrounds
```css
- About: linear-gradient(135deg, #1a1a1a, #2d2d2d)
- Services: linear-gradient(135deg, #252525, #1f1f1f)
- Contact: linear-gradient(135deg, #1e1e1e, #2a2a2a)
- Team/Gallery/Testimonials: #1a1a1a
```

#### Text Colors
```css
- Headings: #f1f1f1
- Paragraphs: #f1f1f1
- Secondary text: #d1d1d1
- Links: #e0e0e0
```

#### Component Backgrounds
```css
- Cards: #2a2a2a
- Forms: #1a1a1a
- Inputs: #1a1a1a with #444 borders
- Footer: #0a0a0a
```

---

## JavaScript Functionality (index.js)

### 1. Preloader
```javascript
- Displays on page load
- Hides after 600ms
- Adds 'hide' class for fade-out
```

### 2. Theme Toggle
```javascript
- Toggles 'dark-theme' class on body
- Saves preference to localStorage
- Loads saved theme on page load
- Updates button icon
```

### 3. Navigation
```javascript
- Hamburger menu toggle
- Smooth scroll to sections
- Active link highlighting
- Header background on scroll
- Mobile menu close on link click
```

### 4. Swiper Sliders

#### Hero Slider
```javascript
new Swiper('.hero-slider', {
  loop: true,
  autoplay: { delay: 5000 },
  speed: 1000,
  effect: 'fade',
  pagination: { clickable: true },
  navigation: { nextEl, prevEl }
})
```

#### Service Sliders
```javascript
- 7 separate sliders (one per service)
- Loop: true
- Autoplay: 5000ms delay
- Speed: 1000ms
- Pagination: clickable bullets
```

#### Testimonial Slider
```javascript
new Swiper('.testimonial-slider', {
  loop: true,
  autoplay: { delay: 5000 },
  speed: 800,
  pagination: { clickable: true },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
})
```

### 5. Service Tabs
```javascript
- Click event on service tabs
- Removes 'active' from all tabs/content
- Adds 'active' to clicked tab
- Shows corresponding service content
```

### 6. Gallery Filter
```javascript
- Click event on filter buttons
- Removes 'active' from all filters
- Adds 'active' to clicked filter
- Shows/hides gallery items by category
- 'all' shows all items
```

### 7. Forms

#### Booking Form
```javascript
- Prevents default submission
- Collects form data
- Shows success modal
- Resets form
- TODO: Send to backend API
```

#### Contact Form
```javascript
- Prevents default submission
- Collects form data
- Shows success modal
- Resets form
- TODO: Send to backend API
```

#### Newsletter Form
```javascript
- Prevents default submission
- Collects email
- Shows success modal
- Resets form
- TODO: Send to backend API
```

### 8. Back to Top Button
```javascript
- Shows when scrolled > 300px
- Smooth scroll to top on click
- Fade in/out animation
```

### 9. AOS (Animate On Scroll)
```javascript
AOS.init({
  duration: 500,
  easing: 'ease-out',
  once: true,
  offset: 50
})
```

### 10. PWA Install Banner
```javascript
- Listens for beforeinstallprompt event
- Shows custom install banner
- Handles install button click
- Hides banner after install/dismiss
```

---

## Component Details

### Navigation Menu (Mobile)
```css
- Width: 280px
- Top: 68px
- Background: Gradient with blur
- Border: 2px gold left border
- Links: 15px 30px padding
- Hover: Gold gradient, slide left 5px
```

### Service Cards
```css
- Grid: 1fr 1fr (desktop), 1fr (mobile)
- Gap: 50px (desktop), 30px (mobile)
- Slider height: 450px
- Info height: 450px
- Price: 1.4rem gold
```

### Team Cards
```css
- Min-width: 280px
- Image height: 300px
- Padding: 20px
- Hover: Lift -10px, shadow increase
- Border-radius: 10px
```

### Gallery Items
```css
- Min-width: 300px
- Height: 300px
- Border-radius: 10px
- Overlay: rgba(0, 0, 0, 0.5)
- Icon: 60x60px circle, scale 0.5 → 1
```

### Forms
```css
- Max-width: 600px
- Padding: 40px (desktop), 30px (mobile)
- Input padding: 12px 15px
- Border-radius: 5px
- Focus: Gold border
```

### Buttons
```css
- Padding: 12px 30px
- Border-radius: 50px
- Font-weight: 600
- Letter-spacing: 1px
- Transition: 0.3s ease
```

---

## Performance Optimizations

### Loading Speed
- Preloader: 600ms (reduced from 2500ms)
- AOS duration: 500ms (reduced from 1000ms)
- Image optimization recommended
- Lazy loading for images

### Animation Performance
- CSS transforms (GPU accelerated)
- Will-change property where needed
- Reduced animation durations
- Optimized easing functions

### Code Optimization
- Minification recommended for production
- Combine CSS/JS files
- Compress images
- Enable browser caching

---

## Browser Compatibility

### Supported Features
- CSS Grid & Flexbox
- CSS Variables
- ES6+ JavaScript
- LocalStorage
- Intersection Observer (AOS)
- Service Workers (PWA)

### Fallbacks
- Graceful degradation for older browsers
- Feature detection recommended
- Polyfills for IE11 (if needed)

---

## Accessibility Features

### Current Implementation
- Semantic HTML5 elements
- Alt text for images
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements

### Recommended Improvements
- Add skip to content link
- Improve color contrast ratios
- Add ARIA live regions for dynamic content
- Implement keyboard shortcuts
- Add screen reader announcements

---

## SEO Optimization

### Current Implementation
- Semantic HTML structure
- Meta description
- Proper heading hierarchy
- Alt text for images

### Recommended Improvements
- Add Open Graph tags
- Add Twitter Card tags
- Implement structured data (JSON-LD)
- Add canonical URLs
- Create sitemap.xml
- Add robots.txt

---

## Testing Checklist

### Functionality
- [ ] All sliders work correctly
- [ ] Navigation menu opens/closes
- [ ] Theme toggle works
- [ ] Forms validate input
- [ ] Gallery filter works
- [ ] Service tabs switch correctly
- [ ] Back to top button appears/works
- [ ] Smooth scrolling functions

### Responsiveness
- [ ] Mobile (320px - 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Landscape orientation
- [ ] Touch interactions work

### Cross-Browser
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Performance
- [ ] Page load < 3 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] Smooth animations

---

## Common Issues & Solutions

### Issue: Images not loading
**Solution:** Check file paths in HTML, ensure images are in `/public` folder

### Issue: Slider not working
**Solution:** Verify Swiper.js is loaded, check console for errors

### Issue: Theme not persisting
**Solution:** Check localStorage is enabled in browser

### Issue: Mobile menu not closing
**Solution:** Verify hamburger click event is attached

### Issue: Forms not submitting
**Solution:** Backend integration required (see BACKEND_GUIDE.md)

---

## Code Maintenance

### Regular Updates
- Update library versions (Swiper, AOS)
- Review and optimize CSS
- Remove unused code
- Update comments

### Code Standards
- Use consistent indentation (2 spaces)
- Comment complex logic
- Use meaningful variable names
- Follow BEM naming for CSS classes

### Version Control
- Use Git for version control
- Create feature branches
- Write descriptive commit messages
- Tag releases

---

## Future Enhancements

### Planned Features
- Online payment integration
- Real-time booking availability
- Customer account system
- Email notifications
- SMS reminders
- Multi-language support
- Blog section
- Loyalty program

### Technical Improvements
- Progressive Web App (PWA) full implementation
- Offline functionality
- Push notifications
- Image lazy loading
- Code splitting
- CDN integration

---

## Resources

### Documentation
- [Swiper.js Docs](https://swiperjs.com/swiper-api)
- [AOS Docs](https://michalsnik.github.io/aos/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [MDN Web Docs](https://developer.mozilla.org/)

### Tools
- Chrome DevTools
- Lighthouse (Performance)
- Wave (Accessibility)
- PageSpeed Insights

---

## Support

For technical questions or issues:
1. Check browser console for errors
2. Review this documentation
3. Check library documentation
4. Test in different browsers
5. Verify all file paths are correct
