export interface FlashcardSet {
    id: number;
    flashcardSetName: string;
    level: string;
    description: string;
    userId: number;
    courseId: number;
  }
  export interface FlashcardSetAddModel {
    flashcardSetName: string;
    level: string;
    description: string;
    userId: number;
    courseId: number;
  }