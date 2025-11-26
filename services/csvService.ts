import { Product } from '../types';
import { RAW_CSV_DATA } from './csvData';

const getPlaceholderImage = (seed: string) => `https://picsum.photos/seed/${seed}/400/550`;

const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export const parseCSVData = (): Product[] => {
  const lines = RAW_CSV_DATA.trim().split('\n');
  const products: Product[] = [];

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    // Use a regex to split by comma but respect quotes if they existed (though this simple data doesn't seem to use them)
    // For this dataset, simple split is safe.
    const columns = line.split(',');
    
    // Check against new structure: 
    // Category[0], Title[1], Brand[2], Price[3], Availability[4], Short Description[5], Product URL[6], Image URL[7]
    if (columns.length < 8) continue;

    const [category, title, brand, priceStr, availability, description, productUrl, imageUrl] = columns;

    // Extract Year using regex from Title (Index 1)
    const yearMatch = title.match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? parseInt(yearMatch[0]) : 1985;

    // Clean Price (remove currency symbol £ or $)
    const cleanPrice = priceStr ? parseFloat(priceStr.replace(/[^0-9.]/g, '')) : 0;

    // Smart Date Extraction
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let issueDate = `${year}`;
    
    // Check for full month name
    const foundMonth = months.find(m => title.includes(m));
    if (foundMonth) {
        issueDate = `${foundMonth} ${year}`;
    } else {
        // Check for short month name
        const foundShort = shortMonths.find(m => title.includes(m));
        if (foundShort) {
            issueDate = `${foundShort} ${year}`;
        }
    }

    const formattedBrand = brand ? toTitleCase(brand) : 'Playboy';

    products.push({
      id: `csv-${i}-${year}`,
      title: formattedBrand,
      issueDate: issueDate,
      year: year,
      country: 'USA',
      description: description || `${title}. Condition: ${availability}.`,
      price: cleanPrice,
      imageUrl: imageUrl && imageUrl.startsWith('http') ? imageUrl.trim() : getPlaceholderImage(`csv-${i}-${year}`),
      isFeatured: availability.toLowerCase().includes('in stock') && Math.random() > 0.85,
      marketNotes: availability,
      actors: [],
      collectibleReason: 'Vintage Issue from Archive'
    });
  }

  return products;
};