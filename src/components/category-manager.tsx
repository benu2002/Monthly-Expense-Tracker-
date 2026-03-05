import { useState } from "react";
import { Plus, X, RotateCcw, Tag, Pencil, Check } from "lucide-react";

type CategoryManagerProps = {
  categories: string[];
  onAdd: (category: string) => void;
  onEdit: (oldCategory: string, newCategory: string) => void;
  onDelete: (category: string) => void;
  onReset: () => void;
};

export function CategoryManager({
  categories,
  onAdd,
  onEdit,
  onDelete,
  onReset,
}: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory) {
      onAdd(newCategory);
      setNewCategory("");
    }
  };

  const startEditing = (category: string) => {
    setEditingCategory(category);
    setEditValue(category);
  };

  const saveEdit = () => {
    if (editingCategory && editValue.trim()) {
      onEdit(editingCategory, editValue);
      setEditingCategory(null);
      setEditValue("");
    }
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setEditValue("");
  };

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Tag className="w-5 h-5 text-primary" />
          Manage Categories
        </h2>
        <button
          onClick={onReset}
          className="p-2 text-muted-foreground hover:text-primary transition-colors"
          title="Reset to defaults"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category..."
          className="flex-1 px-4 py-2 bg-background/50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!newCategory.trim()}
          className="bg-primary text-primary-foreground p-2 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      <div className="flex flex-col gap-2 mt-4">
        {categories.map((category) => (
          <div
            key={category}
            className="group flex items-center justify-between px-3 py-2 bg-secondary/50 border border-border/50 rounded-lg text-sm transition-all hover:bg-secondary hover:border-primary/20"
          >
            {editingCategory === category ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 px-2 py-1 bg-background border rounded-md text-sm outline-none focus:ring-1 focus:ring-primary"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit();
                    if (e.key === "Escape") cancelEdit();
                  }}
                />
                <button
                  onClick={saveEdit}
                  className="text-green-500 hover:text-green-600 p-1"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={cancelEdit}
                  className="text-muted-foreground hover:text-foreground p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <span>{category}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <button
                    onClick={() => startEditing(category)}
                    className="text-muted-foreground hover:text-primary p-1 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onDelete(category)}
                    className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                    title="Delete"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
