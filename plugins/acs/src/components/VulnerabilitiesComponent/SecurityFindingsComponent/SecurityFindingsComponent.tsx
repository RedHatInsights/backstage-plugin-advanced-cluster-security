import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { useTheme } from '@material-ui/core/styles';

import { CVEEntityDetailsComponent } from '../CVEEntityDetailsComponent';

import { CompoundSearchFilter } from '../../CompoundSearchFilterComponent';


export const SecurityFindingsComponent = (data: Array<String>) => {
    const [dataRows, setDataRows] = useState([]);
    const [pending, setPending] = React.useState(true);
    const theme = useTheme();
    const isDarkMode = theme.palette.type === 'dark';

    const columns: [] = [
        { name: 'CVE', selector: row => row.row_data.cve, sortable: true, wrap: true, width: '140px', button: true, cell: row => (
			<a href={row.row_data.link} target="_blank" rel="noopener noreferrer">
				{row.row_data.cve}
			</a>
		), },
        { name: 'Severity', selector: row => row.row_data.severity, sortable: true, wrap: true },
        { name: 'Status', selector: row => row.row_data.status, sortable: true, wrap: true },
        { name: 'Workload', selector: row => row.row_data.workload, sortable: true, wrap: true, grow: 2 },
        { name: 'Image', selector: row => row.row_data.image, sortable: true, wrap: true, grow: 2 },
        { name: 'CVSS', selector: row => row.row_data.cvss, sortable: true, wrap: true },
        { name: 'Discovered', selector: row => row.row_data.discovered, sortable: true, wrap: true },
    ];

    const checkVulnSeverity = (vulnSeverity: string) => {
        let severityLevel: string = "";

        switch (vulnSeverity) {
            case "LOW_VULNERABILITY_SEVERITY":
                severityLevel = "Low"
                break;
            case "MODERATE_VULNERABILITY_SEVERITY":
                severityLevel = "Moderate"
                break;
            case "IMPORTANT_VULNERABILITY_SEVERITY":
                severityLevel = "Important"
                break;
            case "CRITICAL_VULNERABILITY_SEVERITY":
                severityLevel = "Critical"
                break;
            default:
                severityLevel = "N/A"
                break;
        }

        return severityLevel;
    }

    const isFixable = (fixedVersion: string) => {
        if (fixedVersion) return "Fixable";

        return "Not fixable";
    }

    const formatISODateTime = (isoDateString: any) => {
        const date = new Date(isoDateString);

        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        return `${formattedDate} | ${formattedTime}`;
    }

    const getDiscovered = (occurenceDate: string) => {
        const d1 = new Date();
        const d2 = new Date(occurenceDate);

        const differenceInMilliseconds = d1 - d2;

        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

        if (differenceInDays === 1) return `${Math.floor(differenceInDays)} day ago`;
        if (differenceInDays < 1) return "PLACEHOLDER";

        return `${Math.floor(differenceInDays)} days ago`
    }

    const organizeData = () => {
        const rows: any = [];

        data?.data?.forEach((element: Object) => {
            element?.result?.images?.forEach((element1: Object) => {
                for (const [Key, DeploymentValue2] of Object.entries(element1?.scan?.components)) {
                    if (DeploymentValue2.vulns.length === 0) continue;

                    DeploymentValue2?.vulns?.forEach((vulns: Array) => {
                        rows.push({
                            row_data: {
                                cve: vulns?.cve,
                                severity: checkVulnSeverity(vulns?.severity),
                                status: isFixable(vulns?.fixedBy),
                                workload: element?.result?.deployment?.name,
                                image: element1?.name?.fullName,
                                cvss: vulns?.cvss,
                                discovered: getDiscovered(vulns?.firstImageOccurrence),
                                link: vulns?.link,
                            },
                            expanded_data: {
                                severity: checkVulnSeverity(vulns?.severity),
                                first_discovered: formatISODateTime(vulns?.firstImageOccurrence),
                                published: formatISODateTime(vulns?.publishedOn) || "N/A",
                                summary: vulns?.summary,
                                workload: element?.result?.deployment?.name,
                                namespace: element?.result?.deployment?.namespace,
                                cluster: element?.result?.deployment?.clusterName,
                                image: element1?.name?.fullName,
                                component: DeploymentValue2?.name,
                                version: DeploymentValue2?.version,
                                cveFixedIn: vulns?.fixedBy,
                                source: DeploymentValue2?.source,
                                location: DeploymentValue2?.location || "N/A",
                            }
                        });
                    })
                }
            })
        });

        setPending(false)
        setDataRows(rows);
    }

    const [config, setConfig] = useState([]);
    const [searchFilter, setSearchFilter] = useState({});
    const [onSearch, setOnSearch] = useState({});

    const testingsomething = () => {
            const config = [
        {
            displayName: "Image",
            searchCategory: "IMAGE",
            attributes: [
                {
                    displayName: "Name",
                    filterChipLabel: "Image name",
                    searchTerm: "Image",
                    inputType: "autocomplete"
                },
                {
                    displayName: "Tag",
                    filterChipLabel: "Image tag",
                    searchTerm: "Image Tag",
                    inputType: "text"
                }
            ]
        },
        {
            displayName: "Deployment",
            searchCategory: "DEPLOYMENT",
            attributes: [
                {
                    displayName: "Name",
                    filterChipLabel: "Deployment name",
                    searchTerm: "Deployment",
                    inputType: "autocomplete"
                },
                {
                    displayName: "Status",
                    filterChipLabel: "Deployment status",
                    searchTerm: "Inactive Deployment",
                    inputType: "select",
                    inputProps: {
                        options: [
                            { value: "false", label: "Active" },
                            { value: "true", label: "Inactive" },
                        ]
                    }
                }
            ]
        }
    ]

    const searchFilter = {
        "Image": "quay.io/rhacs-eng/scanner-slim:2.35.x-25-g5526c406eb",
        "Namespace": "backend"
    }
    const onSearch = (payload: OnSearchPayload) => {
    // Depending on the action of the payload ("ADD" or "REMOVE") we can update our search state. You can look at the "onURLSearch" util function to see an example of that. It is specifically for URL state, but you can do this another way if you want to keep state somewhere else.
    }


    setConfig(config)
    setSearchFilter(searchFilter)
    setOnSearch(onSearch)

    }

    useEffect(() => {
        organizeData();
    }, []);

    useEffect(() => {
        testingsomething();
    }, [config, searchFilter, onSearch])

    return (
        <div>
            <CompoundSearchFilter
                config={config}
                searchFilter={searchFilter}
                onSearch={onSearch}
            />

            <DataTable
                data={dataRows}
                columns={columns}
                expandableRows
                expandableRowsComponent={CVEEntityDetailsComponent}
                expandableRowsComponentProps={{
                    "cveDetails": "CVE details",
                    "entityDetails": "Entity details"
                }}
                progressPending={pending}
                sortIcon={<ArrowDownward />}
                theme={isDarkMode ? 'dark' : 'light'}
                highlightOnHover
                pagination
            />
        </div>
    )
}
