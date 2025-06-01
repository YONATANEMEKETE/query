"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Checkbox } from "@/Components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";

interface SaveQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    pagePath: string;
    featureOnHomepage: boolean;
  }) => void;
}

export default function SaveQueryModal({
  isOpen,
  onClose,
  onSave,
}: SaveQueryModalProps) {
  const [title, setTitle] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [featureOnHomepage, setFeatureOnHomepage] = useState(false);

  const handleSave = () => {
    if (!title.trim() || !pagePath.trim()) return;

    onSave({
      title: title.trim(),
      pagePath: pagePath.trim(),
      featureOnHomepage,
    });

    // Reset form
    setTitle("");
    setPagePath("");
    setFeatureOnHomepage(false);
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setTitle("");
    setPagePath("");
    setFeatureOnHomepage(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <Save className="h-5 w-5 text-green-600" />
            Save Query Result
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="query-title" className="text-gray-700">
              Title
            </Label>
            <Input
              id="query-title"
              placeholder="e.g., User List"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500  focus:ring-green-500"
            />
          </div>

          {/* Page Path Input */}
          <div className="space-y-2">
            <Label htmlFor="page-path" className="text-gray-700">
              Page Path
            </Label>
            <Input
              id="page-path"
              placeholder="e.g., /users"
              value={pagePath}
              onChange={(e) => setPagePath(e.target.value)}
              className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:ring-green-500"
            />
          </div>

          {/* Feature on Homepage Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="feature-homepage"
              checked={featureOnHomepage}
              onCheckedChange={(checked) =>
                setFeatureOnHomepage(checked as boolean)
              }
              className="border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
            />
            <Label
              htmlFor="feature-homepage"
              className="text-sm font-normal text-gray-700"
            >
              Feature on homepage
            </Label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim() || !pagePath.trim()}
            className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
