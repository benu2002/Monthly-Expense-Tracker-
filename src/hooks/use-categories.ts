import { useState, useEffect } from "react";
import { toast } from "sonner";

const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Health",
  "Other",
];

const STORAGE_KEY = "monthly-expenses-categories";

export function useCategories() {
  const [categories, setCategories] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse categories", e);
        }
      }
    }
    return DEFAULT_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const addCategory = (category: string) => {
    const trimmed = category.trim();
    if (!trimmed) return;
    
    if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("Category already exists");
      return;
    }
    
    setCategories((prev) => [...prev, trimmed]);
    toast.success("Category added");
  };

  const editCategory = (oldCategory: string, newCategory: string) => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    
    if (oldCategory === trimmed) return;

    if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("Category already exists");
      return;
    }

    setCategories((prev) => prev.map((c) => (c === oldCategory ? trimmed : c)));
    toast.success("Category updated");
  };

  const deleteCategory = (category: string) => {
    if (categories.length <= 1) {
      toast.error("You must have at least one category");
      return;
    }
    setCategories((prev) => prev.filter((c) => c !== category));
    toast.success("Category deleted");
  };

  const resetCategories = () => {
    setCategories(DEFAULT_CATEGORIES);
    toast.success("Categories reset to default");
  };

  return { categories, addCategory, editCategory, deleteCategory, resetCategories };
}
