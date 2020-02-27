import {Observable, Subscription} from 'rxjs';
import {Map} from 'ol';
import {locationService} from '@/components/map/location-service';
import {Path} from '@/components/map/features/path';
import {store} from '@/store';
import {simplifyGeometry} from '@/utils/simplify-geometry';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Snap from 'ol/interaction/Snap';
import Select from 'ol/interaction/Select';
import Modify from 'ol/interaction/Modify';
import {doubleClick} from 'ol/events/condition';
import LineString from 'ol/geom/LineString';
import {eventBus} from '@/services/event-bus';
import {Events} from '@/components/events';

export class PathRecorder {
  private subscription: Subscription;
  private path: Path;
  private pathLayer: VectorLayer;
  private source: VectorSource;
  private snap: Snap;
  private select: Select;
  private modify: Modify;

  constructor(private map: Map) {
    this.path = new Path();
  }

  setPath(path: LineString) {
    this.path = new Path(path);
    this.pathLayer = this.path.createVectorLayer();
    this.map.addLayer(this.pathLayer);
  }

  recordPath() {
    this.path = new Path();
    this.pathLayer = this.path.createVectorLayer();
    this.subscription = locationService.watchPosition().subscribe(pos => this.path.setNextPosition(pos));
    this.map.addLayer(this.pathLayer);
  }

  stopRecordingPath() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (!this.isValidPath()) {
      eventBus.$emit(Events.map.tyrMap.failedEditingPath);
    }
    this.enablePathEditing();
  }

  enablePathEditing() {
    this.source = this.pathLayer.getSource();
    this.snap = new Snap({source: this.source});
    this.select = new Select();
    this.modify = new Modify({source: this.source, deleteCondition: event => doubleClick(event)});

    this.map.addInteraction(this.modify);
    this.map.addInteraction(this.snap);
    this.map.addInteraction(this.select);
  }

  deleteRecordedPath() {
    this.disablePathEditing();
    store.dispatch('route/deleteRecordedPath');
    this.map.removeLayer(this.pathLayer);
  }

  saveRecordedPath() {
    this.disablePathEditing();
    this.map.removeLayer(this.pathLayer);
    store.commit('route/setRecordedPath', simplifyGeometry(this.path.lineString.getCoordinates(), 1));
  }

  disablePathEditing() {
    this.map.removeInteraction(this.modify);
    this.map.removeInteraction(this.snap);
    this.map.removeInteraction(this.select);
  }

  isValidPath() {
    return simplifyGeometry(this.path.lineString.getCoordinates(), 1).length > 1;
  }
}
