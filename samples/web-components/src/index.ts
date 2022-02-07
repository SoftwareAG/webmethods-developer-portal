import { ApiGalleryI18ninfo } from './components/api-gallery-i18ninfo/api-gallery-i18ninfo';
import {ApiGalleryItemElement} from './components/api-gallery-item/api-gallery-item-element';
import {ApiGalleryElement} from './components/api-gallery/api-gallery-element';

customElements.define('api-gallery-item', ApiGalleryItemElement);
customElements.define('api-gallery', ApiGalleryElement);
customElements.define('api-gallery-i18ninfo', ApiGalleryI18ninfo);
