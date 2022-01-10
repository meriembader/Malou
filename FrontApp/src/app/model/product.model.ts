import {Topic} from './topic.model';

export class Product {
  constructor(public id: number,
              public name: string,
              public tagline: string,
              public productState: string,
              public imageUrl: string,
              public commentsCount: number,
              public votesCount: number,
              public topics: Topic[]) {
  }
}
