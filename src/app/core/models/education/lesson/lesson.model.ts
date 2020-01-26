import { CloudAssetModel } from './cloud-asset.model';
import { ServerAssetModel } from './server-asset.model';

export interface LessonModel {
    lessonTitle: string;
    serverAssetId: number;
    cloudAsset: CloudAssetModel;
    serverAsset: ServerAssetModel;
}