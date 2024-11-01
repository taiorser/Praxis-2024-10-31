"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';

interface ImageUploadProps {
  currentImage?: string | null;
  onImageUpdate: (image: string) => void;
}

export function ImageUpload({ currentImage, onImageUpdate }: ImageUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setIsOpen(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="relative group">
        <Avatar className="h-24 w-24">
          <AvatarImage src={currentImage || undefined} alt="Profile picture" />
          <AvatarFallback>
            <Camera className="h-8 w-8 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />
        <Button
          variant="secondary"
          size="sm"
          className="absolute bottom-0 right-0"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-square w-full max-w-sm mx-auto relative rounded-lg overflow-hidden">
              {preview && (
                <Image
                  src={preview}
                  alt="Preview"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                if (preview) {
                  onImageUpdate(preview);
                  setIsOpen(false);
                  setPreview(null);
                }
              }}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}