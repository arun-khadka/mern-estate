import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  map: {
    width: "800px",
    height: "400px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginLeft: "20px",
    marginBottom: "20px",
  },
}));

const Map = () => {
  const classes = useStyles();

  return (
    <MapContainer
      center={[52.4797, -1.90269]}
      zoom={13}
      scrollWheelZoom={false}
      className={classes.map}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[52.4797, -1.90269]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
