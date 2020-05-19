export class BadgeModel {
    id: number;
    badgeName: string;
    experiencePoints: number;
    description: string;
    imageUrl: string;
    categoryId: number;
}
export class BadgeAddModel {
    badgeName: string;
    experiencePoints: number;
    description: string;
    imageUrl: string;
    categoryId: number;
}
export class BadgeAssignmentModel {
    badgeId: number;
    userId: number;
}