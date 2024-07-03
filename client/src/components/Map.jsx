import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  map: {
    width: "100%",
    height: "400px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "20px",
  },
}));

const Map = ({listing}) => {
  const classes = useStyles();

  return (
    <MapContainer
      center={[52.4797, -1.90269]}
      zoom={7}
      scrollWheelZoom={false}
      className={classes.map}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
    </MapContainer>
  );
};

export default Map;
