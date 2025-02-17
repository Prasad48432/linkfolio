"use client";
import React, { ChangeEventHandler } from "react";
import { MapPin } from "lucide-react";

const countries = [
  "Afghanistan-AF",
  "Albania-AL",
  "Andorra-AD",
  "Angola-AO",
  "Antigua and Barbuda-AG",
  "Argentina-AR",
  "Armenia-AM",
  "Australia-AU",
  "Austria-AT",
  "Azerbaijan-AZ",
  "Bahamas-BS",
  "Bahrain-BH",
  "Bangladesh-BD",
  "Barbados-BB",
  "Belarus-BY",
  "Belgium-BE",
  "Belize-BZ",
  "Benin-BJ",
  "Bhutan-BT",
  "Bolivia-BO",
  "Bosnia and Herzegovina-BA",
  "Botswana-BW",
  "Brazil-BR",
  "Brunei-BN",
  "Bulgaria-BG",
  "Burkina Faso-BF",
  "Burundi-BI",
  "Cambodia-KH",
  "Cameroon-CM",
  "Canada-CA",
  "Central African Republic-CF",
  "Chad-TD",
  "Chile-CL",
  "China-CN",
  "Colombia-CO",
  "Comoros-KM",
  "Congo-CG",
  "Costa Rica-CR",
  "Croatia-HR",
  "Cuba-CU",
  "Cyprus-CY",
  "Czech Republic-CZ",
  "Denmark-DK",
  "Djibouti-DJ",
  "Dominica-DM",
  "Dominican Republic-DO",
  "Ecuador-EC",
  "Egypt-EG",
  "El Salvador-SV",
  "Equatorial Guinea-GQ",
  "Eritrea-ER",
  "Estonia-EE",
  "Ethiopia-ET",
  "Fiji-FJ",
  "Finland-FI",
  "France-FR",
  "Gabon-GA",
  "Gambia-GM",
  "Georgia-GE",
  "Germany-DE",
  "Ghana-GH",
  "Greece-GR",
  "Grenada-GD",
  "Guatemala-GT",
  "Guinea-GN",
  "Guinea-Bissau-GW",
  "Guyana-GY",
  "Haiti-HT",
  "Honduras-HN",
  "Hungary-HU",
  "Iceland-IS",
  "India-IN",
  "Indonesia-ID",
  "Iran-IR",
  "Iraq-IQ",
  "Ireland-IE",
  "Israel-IL",
  "Italy-IT",
  "Jamaica-JM",
  "Japan-JP",
  "Jordan-JO",
  "Kazakhstan-KZ",
  "Kenya-KE",
  "Kiribati-KI",
  "Kuwait-KW",
  "Kyrgyzstan-KG",
  "Latvia-LV",
  "Lebanon-LB",
  "Lesotho-LS",
  "Liberia-LR",
  "Libya-LY",
  "Liechtenstein-LI",
  "Lithuania-LT",
  "Luxembourg-LU",
  "Madagascar-MG",
  "Malawi-MW",
  "Malaysia-MY",
  "Maldives-MV",
  "Mali-ML",
  "Malta-MT",
  "Marshall Islands-MH",
  "Mauritania-MR",
  "Mauritius-MU",
  "Mexico-MX",
  "Micronesia-FM",
  "Moldova-MD",
  "Monaco-MC",
  "Mongolia-MN",
  "Montenegro-ME",
  "Morocco-MA",
  "Mozambique-MZ",
  "Myanmar-MM",
  "Namibia-NA",
  "Nauru-NR",
  "Nepal-NP",
  "Netherlands-NL",
  "New Zealand-NZ",
  "Nicaragua-NI",
  "Niger-NE",
  "Nigeria-NG",
  "North Korea-KR",
  "Macedonia-MK",
  "Norway-NO",
  "Oman-OM",
  "Pakistan-PK",
  "Palau-PW",
  "Palestine-PS",
  "Panama-PA",
  "Papua New Guinea-PG",
  "Paraguay-PY",
  "Peru-PE",
  "Philippines-PH",
  "Poland-PL",
  "Portugal-PT",
  "Qatar-QA",
  "Romania-RO",
  "Russia-RU",
  "Rwanda-RW",
  "Saint Kitts and Nevis-KN",
  "Saint Lucia-LC",
  "Saint Vincent and the Grenadines-VC",
  "Samoa-WS",
  "San Marino-SM",
  "Sao Tome and Principe-ST",
  "Saudi Arabia-SA",
  "Senegal-SN",
  "Serbia-RS",
  "Seychelles-SC",
  "Sierra Leone-SL",
  "Singapore-SG",
  "Slovakia-SK",
  "Slovenia-SI",
  "Solomon Islands-SB",
  "Somalia-SO",
  "South Africa-ZA",
  "South Korea-KR",
  "South Sudan-SS",
  "Spain-ES",
  "Sri Lanka-LK",
  "Sudan-SD",
  "Suriname-SR",
  "Sweden-SE",
  "Switzerland-CH",
  "Syria-SY",
  "Tajikistan-TJ",
  "Tanzania-TZ",
  "Thailand-TH",
  "Timor-Leste-TL",
  "Togo-TG",
  "Tonga-TO",
  "Trinidad and Tobago-TT",
  "Tunisia-TN",
  "Turkey-TR",
  "Turkmenistan-TM",
  "Tuvalu-TV",
  "Uganda-UG",
  "Ukraine-UA",
  "United Arab Emirates-AE",
  "United Kingdom-GB",
  "United States-US",
  "Uruguay-UY",
  "Uzbekistan-UZ",
  "Vanuatu-VU",
  "Vatican City-VA",
  "Venezuela-VE",
  "Vietnam-VN",
  "Yemen-YE",
  "Zambia-ZM",
  "Zimbabwe-ZW",
];

const CountrySelect = ({
  id,
  value,
  handleFieldChange,
}: {
  id: string;
  value: string;
  handleFieldChange: ({
    id,
    field,
    value,
    isNumber,
    isLink,
  }: {
    id: string;
    field: string;
    value: any;
    isNumber?: boolean;
    isLink?: boolean;
  }) => void;
}) => {
  return (
    <div className="relative">
      <span className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center z-10">
        <MapPin
          strokeWidth={1}
          size={20}
          className="text-primary-text/80 text-xl"
        />
      </span>
      <select
        name="country"
        className="relative  bg-secondary-bg mt-2 text-sm rounded-md pl-8 text-primarytext border border-secondary-border focus:border-secondary-strongerborder focus:outline-none transition duration-150 ease-in-out block w-full px-3 py-2"
        value={value}
        onChange={(e) => {
          handleFieldChange({
            id: id,
            field: "country",
            value: e.target.value,
          });
        }}
      >
        <option value="none" disabled>
          Pick Country
        </option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelect;
