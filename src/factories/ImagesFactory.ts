import Api from '@/api/utils/Api';
import IDimension from '@/interfaces/IDimension'
import { CELL_SIZE } from '@/utils/constants';

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

  /**
   * Returns the X, Y, width and height needed to correctly display an images
   * with the given dimensions.
   * @param width the width of the image
   * @param height the height of the image.
   */
  public getAdjustments(width: number, height: number): any {
    if (width > height) {
      return {
        height: CELL_SIZE,
        x: -((width / height - 1) * CELL_SIZE) / 2
      }
    }
    else {
      return {
        width: CELL_SIZE,
        y: -((height / width - 1) * CELL_SIZE) / 2
      }
    }
  }
}

const images = new ImagesFactory();

export default images;