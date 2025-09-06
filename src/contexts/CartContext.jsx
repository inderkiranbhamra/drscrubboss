import React, { useContext, useState, createContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
// 1. Import new Firestore functions for subcollections
import {
  collection,
  doc,
  getDocs,
  writeBatch,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth();

  // This effect handles loading, merging, and syncing the cart
  useEffect(() => {
    const syncCart = async () => {
      // --- Case 1: User is logged in ---
      if (currentUser) {
        // Reference to the user's 'cart' subcollection
        const cartColRef = collection(db, 'users', currentUser.uid, 'cart');
        const guestCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

        // Get the user's cart from the Firestore subcollection
        const querySnapshot = await getDocs(cartColRef);
        const firestoreCart = querySnapshot.docs.map(doc => ({
          id: doc.id, // Store the document ID for easy removal later
          ...doc.data(),
        }));

        let finalCart = [...firestoreCart];

        // If there's a guest cart, merge it into Firestore
        if (guestCart.length > 0) {
          const batch = writeBatch(db);

          guestCart.forEach(guestItem => {
            // Only add guest item if it's not already in the firestore cart
            if (!firestoreCart.some(item => item.name === guestItem.name)) {
              // Create a new document reference in the subcollection
              const newCartItemRef = doc(cartColRef);
              batch.set(newCartItemRef, guestItem);
              // Add to the local state optimistically
              finalCart.push({ ...guestItem, id: newCartItemRef.id });
            }
          });
          
          // Commit all the new items to Firestore at once
          await batch.commit();
          // Clear the guest cart from local storage
          localStorage.removeItem('cartItems');
        }

        // Set the component's state to the synced cart
        setCartItems(finalCart);
      }
      // --- Case 2: User is logged out ---
      else {
        // Load the cart from local storage for guests
        const guestCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(guestCart);
      }
    };

    syncCart();
  }, [currentUser]); // This effect runs whenever currentUser changes

  const addToCart = async (product) => {
    // Prevent adding the same product multiple times
    if (cartItems.find(item => item.name === product.name)) {
      alert(`${product.name} is already in your cart.`);
      return;
    }

    alert(`${product.name} has been added to your cart!`);

    if (currentUser) {
      // If logged in, add a new document to the 'cart' subcollection
      try {
        const cartColRef = collection(db, 'users', currentUser.uid, 'cart');
        const docRef = await addDoc(cartColRef, product);
        // Update local state with the new item, including its Firestore ID
        setCartItems(prevItems => [...prevItems, { ...product, id: docRef.id }]);
      } catch (error) {
        console.error("Error adding item to Firestore:", error);
      }
    } else {
      // If guest, update local state and save to localStorage
      const newCart = [...cartItems, product];
      setCartItems(newCart);
      localStorage.setItem('cartItems', JSON.stringify(newCart));
    }
  };

  const removeFromCart = async (productId) => {
    if (currentUser) {
      // If logged in, delete the specific document from the subcollection
      try {
        const cartItemRef = doc(db, 'users', currentUser.uid, 'cart', productId);
        await deleteDoc(cartItemRef);
      } catch (error) {
        console.error("Error removing item from Firestore:", error);
      }
    }
    
    // For both logged-in and guest users, update the local state
    const newCart = cartItems.filter(item => item.id !== productId);
    setCartItems(newCart);

    // If guest, also update localStorage
    if (!currentUser) {
      localStorage.setItem('cartItems', JSON.stringify(newCart));
    }
  };

  const clearCart = async () => {
    if (currentUser) {
      // If logged in, delete all documents in the subcollection
      try {
        const cartColRef = collection(db, 'users', currentUser.uid, 'cart');
        const querySnapshot = await getDocs(cartColRef);
        
        // Use a batch to delete all documents efficiently
        const batch = writeBatch(db);
        querySnapshot.forEach(doc => {
          batch.delete(doc.ref);
        });
        await batch.commit();

      } catch (error) {
        console.error("Error clearing Firestore cart:", error);
      }
    } else {
      // If guest, just clear localStorage
      localStorage.removeItem('cartItems');
    }
    
    // Clear the local state for everyone
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
