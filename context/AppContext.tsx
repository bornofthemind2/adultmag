import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User } from '../types';
import { fetchCuratedCatalog } from '../services/geminiService';
import { parseCSVData } from '../services/csvService';
import toast from 'react-hot-toast';

interface AppState {
  ageVerified: boolean;
  verifyAge: () => void;
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  user: User;
  isLoading: boolean;
  addToCart: (product: Product, variant: 'physical' | 'digital') => void;
  removeFromCart: (productId: string, variant: 'physical' | 'digital') => void;
  updateCartQuantity: (productId: string, variant: 'physical' | 'digital', quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  login: (email: string) => void;
  logout: () => void;
  // Admin Actions
  toggleFeatured: (productId: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  refreshCatalog: () => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

const dummyUser: User = {
  id: 'guest',
  email: '',
  isAdmin: false,
  isAuthenticated: false,
};

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  const [ageVerified, setAgeVerified] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User>(dummyUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem('age_verified');
    if (verified === 'true') {
      setAgeVerified(true);
    }
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    setIsLoading(true);
    try {
      // 1. Parse CSV Data (Immediate)
      const csvData = parseCSVData();
      
      // 2. Fetch AI Data (Async)
      // Note: In a real app we might wait for both, but here we can render CSV first if we wanted, 
      // but simpler to wait for all to avoid layout shift.
      const aiData = await fetchCuratedCatalog();
      
      // 3. Merge Data
      // Combine and sort by Year Descending
      const allProducts = [...csvData, ...aiData]
        .filter(p => {
          // Explicitly remove Penthouse October 1985 per request
          const title = p.title.toLowerCase();
          const date = p.issueDate.toLowerCase();
          const isTarget = title.includes('penthouse') && 
                           p.year === 1985 && 
                           (date.includes('oct') || date.includes('10'));
          return !isTarget;
        })
        .sort((a, b) => b.year - a.year);
      
      setProducts(allProducts);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load catalog");
      // Fallback to just CSV if AI fails
      setProducts(parseCSVData());
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAge = () => {
    sessionStorage.setItem('age_verified', 'true');
    setAgeVerified(true);
  };

  const addToCart = (product: Product, variant: 'physical' | 'digital') => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.variant === variant);
      if (existing) {
        toast.success(`Added another ${product.title} (${variant})`);
        return prev.map(item => (item.id === product.id && item.variant === variant) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      toast.success(`${product.title} (${variant}) added`);
      return [...prev, { ...product, quantity: 1, variant }];
    });
  };

  const removeFromCart = (productId: string, variant: 'physical' | 'digital') => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.variant === variant)));
    toast.success("Item removed");
  };

  const updateCartQuantity = (productId: string, variant: 'physical' | 'digital', quantity: number) => {
    if (quantity < 1) return removeFromCart(productId, variant);
    setCart(prev => prev.map(item => (item.id === productId && item.variant === variant) ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const addToWishlist = (product: Product) => {
    if (wishlist.some(p => p.id === product.id)) {
        toast("Already in wishlist", { icon: '❤️' });
        return;
    }
    setWishlist(prev => [...prev, product]);
    toast.success("Added to Wishlist");
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
    toast.success("Removed from Wishlist");
  };

  const login = (email: string) => {
    const isAdmin = email.toLowerCase().includes('admin');
    setUser({
      id: Date.now().toString(),
      email,
      isAdmin,
      isAuthenticated: true
    });
    toast.success(`Welcome back, ${email}`);
  };

  const logout = () => {
    setUser(dummyUser);
    toast.success("Logged out");
  };

  // Admin Functions
  const toggleFeatured = (productId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, isFeatured: !p.isFeatured } : p));
    toast.success("Featured status updated");
  };

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
      const product = { ...newProduct, id: `manual-${Date.now()}` };
      setProducts(prev => [product, ...prev]);
      toast.success("Product created");
  };

  const updateProduct = (updatedProduct: Product) => {
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      toast.success("Product updated");
  };

  const deleteProduct = (productId: string) => {
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast.success("Product deleted");
  };

  return (
    <AppContext.Provider value={{
      ageVerified,
      verifyAge,
      products,
      cart,
      wishlist,
      user,
      isLoading,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      login,
      logout,
      toggleFeatured,
      addProduct,
      updateProduct,
      deleteProduct,
      refreshCatalog: loadCatalog
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppStore must be used within AppProvider");
  return context;
};