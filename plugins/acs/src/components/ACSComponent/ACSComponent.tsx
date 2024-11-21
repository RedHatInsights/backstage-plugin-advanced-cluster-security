import React from 'react';
import {
  Grid,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import {
    InfoCard,
    Header,
    Page,
    Content,
    ContentHeader,
} from '@backstage/core-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { VulnerabilitiesComponent } from '../VulnerabilitiesComponent';
import { queryACSData } from '../../common/QueryACS'

export function ACSComponent() {
    const [value, setValue] = React.useState(0);
    const title: string = "Advanced Cluster Security"
    const subheader: string = "Assess and remediate vulnerabilities and security violations in your workloads"
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const TabsComponent = () => {
      return (
        <div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Vulnerabilities" />
          <Tab label="Policies" />
        </Tabs>
        </div>
      )
    }

    return (
      <div>
      <InfoCard title={title} subheader={subheader}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <TabsComponent />
          </Grid>
          <Grid item>
            <VulnerabilitiesComponent />
          </Grid>
        </Grid>
      </InfoCard>
      </div>
    )
}

export default ACSComponent;