import React, { useState } from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import { InfoCard } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { QueryACSData } from '../../common/QueryACSData';
import { SecurityFindingsComponent } from './SecurityFindingsComponent';

import { DataFilterComponent } from '../DataFilterComponent';

export const VulnerabilitiesComponent = ({ deploymentName }) => {
    /* eslint-disable new-cap */
    const {
        result: ACSDataResult,
        loaded: ACSDataLoaded,
        error: ACSDataError,
    } = QueryACSData(deploymentName);
    /* eslint-enable new-cap */

    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));

    const classes = useStyles();

    const [filters, setFilters] = useState({});

    console.log("filters:", filters)

    if (ACSDataError) {
        return (
            <InfoCard>
                <Typography align="center" variant="button">
                    Error retrieving data from ACS.
                </Typography>
            </InfoCard>
        );
    }

    if (!ACSDataLoaded) {
        return (
            <InfoCard className={classes.root}>
                <LinearProgress />
            </InfoCard>
        );
    }

    if (ACSDataResult.length === 0) {
        return (
          <InfoCard>
            <Typography variant="h5" component="h5" align="center">
               No results found for query {deploymentName}.
            </Typography>
            <Typography variant="subtitle1" align="center">
               To configure this component to display data from ACS, add the annotation <Box component="pre" sx={{ display: 'inline' }}>`rhdh/acs-deployment:</Box> followed by a comma separated string of deployment names to the entity.
            </Typography>
          </InfoCard>
        );
    }

    return (
        <Box sx={{ minHeight: '500px' }}>
            <DataFilterComponent
                setFilters={setFilters}
                data={ACSDataResult}
            />

            <SecurityFindingsComponent data={ACSDataResult} filters={filters} />
        </Box>
    );
};
