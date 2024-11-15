import { classes } from "@/helpers/styles.helpers";
import styles from "./AirportDetailContainer.module.scss";
import { Text } from "@/primitives";

export type AirportDetailContainerProps = {
  airport: AirportData;
};

export default function AirportDetailContainer({
  airport,
}: AirportDetailContainerProps): JSX.Element {
  const cl = classes(styles);

  return (
    <div className={cl("root")}>
      <div className={cl("cell")}>
        <Text component="p" variant="body1" text={airport.airport} />
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body2" text={airport.name} />
      </div>
      <div className={cl("cell")}>
        <Text
          component="p"
          variant="body4"
          text={`Latitude: ${airport.location.latitude}`}
        />
        <Text
          component="p"
          variant="body4"
          text={`Longitude: ${airport.location.longitude}`}
        />
        <Text
          component="p"
          variant="body4"
          text={`Elevation: ${airport.location.elevation_ft} ft`}
        />
      </div>
      <div className={cl("cell")}>
        <Text
          component="p"
          variant="body4"
          text={`CTAF: ${airport.radio_frequencies.CTAF}`}
        />
        {airport.radio_frequencies.ATIS && (
          <Text
            component="p"
            variant="body4"
            text={`ATIS: ${airport.radio_frequencies.ATIS}`}
          />
        )}
        {airport.radio_frequencies.Ground && (
          <Text
            component="p"
            variant="body4"
            text={`Ground: ${airport.radio_frequencies.Ground}`}
          />
        )}
        {airport.radio_frequencies.Tower && (
          <Text
            component="p"
            variant="body4"
            text={`Tower: ${airport.radio_frequencies.Tower}`}
          />
        )}
        <Text
          component="p"
          variant="body4"
          text={`FSS: ${airport.radio_frequencies.FSS.name} on ${airport.radio_frequencies.FSS.frequency}`}
        />
        {airport.radio_frequencies.AWOS && (
          <Text
            component="p"
            variant="body4"
            text={`AWOS: ${airport.radio_frequencies.AWOS}`}
          />
        )}
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body4" text="Runways:" />
        {airport.runways.map((runway, index) => (
          <div key={index} className="runway">
            <Text
              component="p"
              variant="body4"
              text={`Runway: ${runway.runway}`}
            />
            <Text
              component="p"
              variant="body4"
              text={`Dimensions: ${runway.dimensions_ft}`}
            />
            <Text
              component="p"
              variant="body4"
              text={`Surface: ${runway.surface}`}
            />
            <Text
              component="p"
              variant="body4"
              text={`Condition: ${runway.condition}`}
            />
            <Text
              component="p"
              variant="body4"
              text={`Lighting: ${runway.lighting}`}
            />
            <Text
              component="p"
              variant="body4"
              text={`Markings Condition: ${runway.markings_condition}`}
            />
          </div>
        ))}
      </div>
      <div className={cl("cell")}>
        <Text
          component="p"
          variant="body4"
          text={`Fuel Services: ${airport.fuel_services.join(", ")}`}
        />
      </div>
    </div>
  );
}
