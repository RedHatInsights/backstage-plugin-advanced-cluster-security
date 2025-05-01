import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SecurityFindingsComponent } from './SecurityFindingsComponent';

const mockData = () => {
    return [
      {
        "result": {
          "deployment": {
            "name": "test-app-1",
            "namespace": "test-app-system",
            "created": "2022-03-04T19:29:30Z",
            "clusterName": "test-cluster-1",
          },
          "images": [
            {
              "name": {
                "registry": "registry.io",
                "remote": "testservices/test-app-1",
                "tag": "0000001",
                "fullName": "registry.io/testservices/test-app-1:0000001"
              },
              "scan": {
                "components": [
                  {
                    "name": "test-library-1",
                    "version": "1.1.8",
                    "vulns": [
                      {
                        "cve": "vuln-1:1234",
                        "cvss": 3.3,
                        "summary": "vuln-1 summary info here",
                        "link": "https://website.com/test/vuln-1:1234",
                        "fixedBy": "1.1.10",
                        "cvssV3": {
                          "score": 3.3,
                        },
                        "publishedOn": "2025-01-28T00:00:00Z",
                        "lastModified": "2025-01-28T00:00:00Z",
                        "firstImageOccurrence": "2025-01-29T17:38:36.570058880Z",
                        "severity": "MODERATE_VULNERABILITY_SEVERITY",
                        "state": "OBSERVED",
                        "cvssMetrics": [],
                        "nvdCvss": 0
                      },
                    ],
                    "layerIndex": 22,
                    "priority": "267",
                    "source": "OS",
                    "location": "",
                    "topCvss": 3.3,
                    "riskScore": 1.09075,
                    "fixedBy": "1.1.10",
                    "executables": []
                  },
                  {
                    "name": "test-library-2",
                    "version": "5.3.0",
                    "vulns": [
                      {
                        "cve": "vuln-2:1234",
                        "cvss": 5.0,
                        "summary": "vuln-2 summary info here",
                        "link": "https://website.com/test/vuln-1:1234",
                        "fixedBy": "5.4.0",
                        "cvssV3": {
                          "score": 5.0,
                        },
                        "publishedOn": "2025-01-28T00:00:00Z",
                        "lastModified": "2025-01-28T00:00:00Z",
                        "firstImageOccurrence": "2025-01-29T17:38:36.570058880Z",
                        "severity": "MODERATE_VULNERABILITY_SEVERITY",
                        "state": "OBSERVED",
                        "cvssMetrics": [],
                        "nvdCvss": 0
                      },
                    ],
                    "layerIndex": 22,
                    "priority": "267",
                    "source": "OS",
                    "location": "",
                    "topCvss": 5.0,
                    "riskScore": 1.09075,
                    "fixedBy": "5.3.0",
                    "executables": []
                  },
                  {
                    "name": "test-library-3",
                    "version": "2.3.0",
                    "vulns": [
                      {
                        "cve": "vuln-3:1111",
                        "cvss": 1.0,
                        "summary": "vuln-3 summary info here",
                        "link": "https://website.com/test/vuln-1:1234",
                        "fixedBy": "1.2.0",
                        "cvssV3": {
                          "score": 1.0,
                        },
                        "publishedOn": "2025-01-28T00:00:00Z",
                        "lastModified": "2025-01-28T00:00:00Z",
                        "firstImageOccurrence": "2025-01-29T17:38:36.570058880Z",
                        "severity": "MODERATE_VULNERABILITY_SEVERITY",
                        "state": "OBSERVED",
                        "cvssMetrics": [],
                        "nvdCvss": 0
                      },
                    ],
                    "layerIndex": 22,
                    "source": "OS",
                    "location": "",
                    "topCvss": 1.0,
                    "riskScore": 1.09075,
                    "fixedBy": "1.2.0",
                    "executables": []
                  }

                ],

              },
            }
          ]
        }
      }
    ]
}

describe('SecurityFindingsComponent', () => {
  test('displays loading state initially', () => {
    const organizeData = jest.fn();
    (organizeData as jest.Mock).mockReturnValue([]);

    render(<SecurityFindingsComponent data={[]} filters={""} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
