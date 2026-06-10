import { MediaListComponent } from './features/media/pages/media-list/media-list.component';
import { MediaGridComponent } from './features/media/pages/media-grid/media-grid.component';

export const routes = [
  { path: '', component: MediaListComponent },
  { path: 'table', component: MediaGridComponent },
];
