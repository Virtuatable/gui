import Api from '@/api/utils/Api';
import IDimension from '@/interfaces/IDimension'

export class ImagesFactory {
  public getSize(path: string): Promise<IDimension> {
    const img = new Image();
    img.src = Api.path(path);
    return new Promise<IDimension>((resolve: any) => {
      img.addEventListener("load", function() {
        resolve({ height: this.naturalHeight, width: this.naturalWidth })
      })
    })
  }
}

const images = new ImagesFactory();

export default images;