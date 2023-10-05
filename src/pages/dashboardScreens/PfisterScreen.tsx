import React, { useState } from 'react';
import { useSelector } from 'src/redux/store';
import UsersDropDown from 'src/components/all-users-dropdown';
import { useAuthContext } from 'src/auth/useAuthContext';

import keys from './data.json';

function roundToOneDecimalPlace(number: any) {
  return Math.round(number * 10) / 10;
}

export const PfisterScreen = ({ currentSelectedUser, setCurrentSelectedUser }: any) => {
  const { isGetReportLoading, reportsData } = useSelector((state) => state.report);

  const { user } = useAuthContext();

  console.log('sensorData', reportsData?.rows?.[0]?.TransactionData?.[0]);

  const apiValues = reportsData?.rows?.[0]?.TransactionData?.[0];
  console.log('sensorData', apiValues?.[keys?.[2.3]]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      // width="1280"
      // height="720"
      version="1.1"
      viewBox="0 0 1280 720"
      xmlSpace="preserve"
    >
      <defs>
        <clipPath id="clipPath18" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <linearGradient
          id="linearGradient34"
          x1="480"
          x2="480"
          y1="1080"
          y2="0"
          gradientUnits="userSpaceOnUse"
          spreadMethod="pad"
        >
          <stop offset="0" stopColor="#01a5d8" stopOpacity="1" />
          <stop offset="0.205" stopColor="#2776b7" stopOpacity="1" />
          <stop offset="0.435" stopColor="#4b4a99" stopOpacity="1" />
          <stop offset="0.5" stopColor="#4b4a99" stopOpacity="1" />
          <stop offset="0.565" stopColor="#4b4a99" stopOpacity="1" />
          <stop offset="0.795" stopColor="#2776b7" stopOpacity="1" />
          <stop offset="1" stopColor="#01a5d8" stopOpacity="1" />
        </linearGradient>
        <clipPath id="clipPath60" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath72" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath90" clipPathUnits="userSpaceOnUse">
          <path d="M825 347.52h25.56V393H825z" clipRule="evenodd" />
        </clipPath>
        <mask id="mask94" width="1" height="1" x="0" y="0" maskUnits="userSpaceOnUse">
          <image
            width="1"
            height="1"
            imageRendering="optimizeSpeed"
            preserveAspectRatio="none"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAB+CAAAAAC8bDiYAAAAAXNCSVQI5gpbmQAAAlhJREFUaIHtmC93E0EUxe9wesC0JvVVzQfoB0ChWhPM1hQTfPC4oPDgW5+Yqq2BiqrUgAFMYkBhEoOi5lbszO7szKTzsrs9p5S5Jjtv3/5m35t/Lwsk/cOa15tjNmAMSdJ6cE6Sp2VzmySfRilvSZJcmvaXon1u2iTJXhRDrVHR7Jm2vj0LY7ac9p65OHASsll+TijRBkGFAWuCeuIaLvTvQimllNo19qKpLqVhFb2aqeOmWDpSwMieNh4GKEdxAwUwIXm5aSYVczCvEXWMKSdnbRkA9gUYQW7mcReBXozIbD/iFM8cJX4dDfijxFi7XwZc/2pHm3wzS3Di3pKsTDOQ9E0lJmR05efmJtLxXZjjyvJM8tjBT5LkJ9P2g1rt1p8IBlX6q9rbWJLss4Pyalz8VANexDXBSwHm1DVojCL0SB9duC4S6aCq3OR/WmDaSmP6lWWnBcbaKAdhRxHG0nnAqwFm1QJTLYb39UmcZYvpMaSyKpi/tj0nOYe3USxL73FhcIs2IFBlxo8PjZnicFtfeCFIprW/ws9eW7fzQ3wO5HxQvvKP73a3dnln++fxctIOCsAUAJDhTBDDuqAwQaZZtdw8vxITgFpQS8dtxnGTk+HG2Yw3ORneVBb5nL3zbdx+G55TTf6DdbXCzZau36Jp2fqw6psKoz4CrwIe13i3sCdETB/WL79oaSwLKlYW30Pt93XaDfIe1SMJ/2hw9VCnX8IkTMIkTMIkzOPFNKpffUwnlM4wrT/gFphOKAmTMAmTMAmTMI78b6J1rY6Gv4F+f9hNd/+jbgE+qI68wzoxewAAAABJRU5ErkJggg=="
          />
        </mask>
        <clipPath id="clipPath126" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath136" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath152" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath164" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath176" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath188" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath200" clipPathUnits="userSpaceOnUse">
          <path d="M749.88 388.2h18.48v18.6h-18.48z" clipRule="evenodd" />
        </clipPath>
        <mask id="mask204" width="1" height="1" x="0" y="0" maskUnits="userSpaceOnUse">
          <image
            width="1"
            height="1"
            imageRendering="optimizeSpeed"
            preserveAspectRatio="none"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAAAAAAfym/2AAAAAXNCSVQI5gpbmQAAAdpJREFUSIndlDtLXFEUhddc5xpQo6hDVISYYgpB7YIpAhL8BUklkoA2QYs0SdpAwJ+Q1lIRxMbWalKZgE1MioBFXqIkSCagGUWdmS/F3Me5k3nsqQRXc/bZrO88Nvsc6XqpzZ142fm7v45b4l8AwJMWkB0CbZiRRYD9Q4AZI5IC8pI6C3BpZEYASdIw0N/Q6oXBpPRHknQgaSpp8jtqM5+lL1G26DgGtrgokK95x0evKuMtoDdOL4XVPLpR/7RfEzV4Q6x0HWLkG/A8mo45CHthNn1BteJ76QAgN9r/FIC+IJtvhHgAK5KUAVgO0g+qiEu3QPcBfEnSR6J7pt/e7nFM5f0T93aDklRxvp+Q6hUhIR/IVcIPQMnCKLOyGJ4AWDUxkb4DDLUApJ6dQ9jDUlolr6HfUSYYvV0zMvk73OfIigz9jOPSf41QQ8V569JXrJQT+028pXJ1ZtxQis2qD8lSPlhPnA2Z9LebuAsWbEzXJ7cGbXeabJVduidJw7bFQ00DFJv7JGluOVh8zXkSjbVG9LWamQLwOGZMr+dU0kPT6rFyAJ2StG0+WxaA2dTgO4Bz20Y/3Pa5aWPayzHy2oZI3Wch8tKKSJorA+z0KvnmmsjvKBZa2ORq9A/TorDI9oaAvgAAAABJRU5ErkJggg=="
          />
        </mask>
        <clipPath id="clipPath216" clipPathUnits="userSpaceOnUse">
          <path d="M748.8 442.44h20.52v20.52H748.8z" clipRule="evenodd" />
        </clipPath>
        <mask id="mask220" width="1" height="1" x="0" y="0" maskUnits="userSpaceOnUse">
          <image
            width="1"
            height="1"
            imageRendering="optimizeSpeed"
            preserveAspectRatio="none"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAAAAACN7WTCAAAAAXNCSVQI5gpbmQAAAxBJREFUSImllk1oHGUYx3+b7CRtpa7RbkHqRyVCjLQp+IEoBb+qpX5cRKkUe7IexIJ4kKLooWjRUHuoQTRURA8V8VA8REEPiuYgSNOKBVuo2Bp0iTEJq2Y1Zpv9eZiZ3U0yyc6k/8s8+77P733+87yz7wwkqH3w3+/65o0cHn8iKXG+Og31dH3kEVVXteC61NmpafXjaKRN5yZ1ZmHmpqiCRQBqehvQMaUPhglvKxT16gXg2RjcBzBY91SxGgYjCugDzVQeevrzAEz2A+yiFHm699v85VMARrnxtY1awi3qnY3wbgAGFLp1A8CWs6prksDuRhiay6njWgEYDu9qHaHLwjah8nmCAQAf/4giF64BhrdSPvB1tTRRX1t17xIVITj4yTMAt+r789Y8ruoNS4KxRvwzDkOrtyxhcqFu4nActqVEYq1eHrzZU4njX/JsE7hpqlwul8vl34v1hB1clwjuJjjXAIe6CoVCoVBYv6el0dJrbPTHQ6/sgjxcvz8A4I83WoK8eH6Q3l745tdFU9oNLzlN0nYAwb6q2p65q1T7g1wuNxftY1uvMDGeZYEQnANg71sZwNBqCaA2nL3ihixIc8UV6GLAO+LD6qqM4JE43pkFzMPm59oB+OudjGDtUBYg1oqbE+5jsFUof58dnAXgqXczgKHV8N91InvFhe+h1BVXoIsBN/8Xaqa4aNYEogEOdYTq3ANUoNKY/axnSTAP1+7vAKA0AGNrODoWz/WcyZ3pKqcyflBfhviUY23NpHfvYuX0HMCVP3hhO8DD+lAa8ED44XBC1bnLgFGX6U9D454Oucrx82o73K+XpgB1BwQ6BNyoRwC9vTWX040wEDXkQ2eBms8nJzc/OQH8A3dFXzEfEAAzXNEanIVL4FQ0tp0asJrR1lbRx2CVvgqs02OA9rWigJ+cAH7TX978Qu2AJ7UzBbhb1wOT4THbC0w70QoCoOrfAPeNWn09APp1SyrwHh1p+vmopj3AjulYvdFH1XxKkE/Vn/uAte9VtZamM5G22dBXmQ6W3AsRdnLZcv8DLUOSCTL80coAAAAASUVORK5CYII="
          />
        </mask>
        <clipPath id="clipPath264" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath280" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath296" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath312" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath328" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath344" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath360" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath376" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath396" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath408" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath420" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath436" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath448" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath460" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath472" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath488" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath502" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath512" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath522" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath532" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath542" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath554" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath572" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <linearGradient
          id="linearGradient598"
          x1="355.86"
          x2="355.86"
          y1="348.06"
          y2="127.98"
          gradientUnits="userSpaceOnUse"
          spreadMethod="pad"
        >
          <stop offset="0" stopColor="#b4c7e7" stopOpacity="1" />
          <stop offset="0.085" stopColor="#b4c7e7" stopOpacity="1" />
          <stop offset="0.375" stopColor="#fcc" stopOpacity="1" />
          <stop offset="0.5" stopColor="#fcc" stopOpacity="1" />
          <stop offset="0.625" stopColor="#fcc" stopOpacity="1" />
          <stop offset="0.915" stopColor="#b4c7e7" stopOpacity="1" />
          <stop offset="1" stopColor="#b4c7e7" stopOpacity="1" />
        </linearGradient>
        <clipPath id="clipPath614" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath626" clipPathUnits="userSpaceOnUse">
          <path d="M61.44 397.32h78.12v47.64H61.44z" clipRule="evenodd" />
        </clipPath>
        <mask id="mask630" width="1" height="1" x="0" y="0" maskUnits="userSpaceOnUse">
          <image
            width="1"
            height="1"
            imageRendering="optimizeSpeed"
            preserveAspectRatio="none"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAACECAAAAAA4xdGDAAAAAXNCSVQI5gpbmQAABX1JREFUeJztnH9M1HUYxz/fu+OAAzvoDCRCBH8BQyzDDIuBzFCayhAbirVMZylJSiOqkWZrNlnDWMVIkRpTa4S0gkjXTGYQJGFBGCIqZAg6fsgPj1/369Mf2kC8Z27fz8WzZ/u+/rv/3u/dPc89v75fxhQUFBQUFBQUFBTuwj3QGVvC/4J2Xf3AuS1O2DIcjhT+jYlzbtqALcTR+OYMcM455/Xu2FIcivvWq/wOFZ7YYhyIOq7a+p8xXq/HluMwpAVFo3wc21vYghyF995efhcdYbOxNTkC3eaLNj6JrvoHsWUJo37qtGWyL865MQZbmCjz8o12fHH+mwu2MjEMmTfs+uL8yiPY2kRwWdt4T4DdSY4ty7DFCSBFlJuAL8x4bAa2OgFm5d4CfPHOlRpsdfLRp7ZDvjgfXIotTzZOa+qssDHOv5WwFcpDCimBAmy4wcw5b03FligPn/19gC/zydW6E3zwc29sibJwe6UN8GW9uNGFsYX7gklOCzTRVVCA9b7nga1OgJAjw4AvY2mwCludfDz39EABduZpwr5cNzSBpdROwuWvOvKUGfjCevb6YqsTwP/gEOBr7PQqbHECeKZfA3xZfk4kmeNv45zYAGX6zl1u2Orko3qsDCql+vKCsdUJ4JcDlVJjZYsoZ/oUqFexNq0l3INpYmvAAMskPAWWQotHAF8jX8/BVifA9H39gC/LL0lqbHXy0W1qAXzZGpN12Orko4qqtDf25Zzzvk/9sNXJR5pdYH/sy7mxMJTohIMxxgzvXAd8WaujCAeYNukC1Kv8nUK4aVYtAce+w/k+2OrkI83KGwB8jZUuJtxcTkvrBHxZahMJX3g4ramFSql/0h/AVicfaeF3o4CvW3mh2OoEmJF1E/BlLV9MuFdx23YZ8GVrTqXcNC8/C5ZSGQ9hqxNg/hGoVxkuisYWJ4Dh/W7Al+VUBOWpVPJfUCl1/WVXbHXyUUf+CAVYz/6HCdf0gV9AG/TRY+GEfXmkdwC+bDXrCU+ltM/9DgQYb90xHVudfKTwE2OAr/5cylMpvwNQrzJ6fBHhAHPf2QYFWEOcFludfDQrq6FepWu3AVudfKSwr6BeZfDjAMI/RO8PwQ16NeVexfXFFqiUalxPuJRSxVSAAfYm5WPmOQXQicpIYRi2OAEMb3cBvqwVywgHmHbjeaiUatlOeCqleuIH6ESl9yOa53q3CfgE7FVKFmCLE0CfAW7Q6xIIDwO0q6FrX1vrDsLPvknhJVCvMlgwE1udAD7g2NdUSvkY0X1rG1hKZRDeq6jjwGvfjjQvbHXykYKOQmPfofwAbHUCeL3bC/gyn4whvEF3Tm6GAqz5BcILWfXSn6BSqjuLcq8y9xDYq3wZgi1OAP0b4IlK3QrKAZbQCGX6S7sIDwOkiDIowAayCZ+oMN+cQcCX6ftYwtM2/avtQKa31iSQHvuehQLsRhrlYUBoMZTp+3MDsdUJ4PsB1KuYK58kHGCuL12GSqnzSYRfq6KJroQyfWcm4SNLFlIIllJFlBeXHruhExXzmXjCpZQLeO3LmzcRnrZJS8ATlZvZ/tjqBJj5GVRKmYuDCGd6z9eha19r7fOESymn+D+gf7CrKZRLqUfBa9+Bw5R7FZ9s6MEpU+njhG+ldNsvQQFWH08407OoX6FM3075nJ4xlz8BX8aDQdjaxJhn/5Ewa8WzhEspxhhjofaSou3ClmnYwoRxq7vXWP8ewnuVcVZdmfS2h6Hj4YQXfBNQ6bMmVh+2qmjqATaOV9sEZ6OR2HIcyeaJ07dyUtXvfeJGZ53wYS6pv+f7OPPWMMZsDdvOMWY5urxnSiRNDYZDTbZrr3myZ7qrYgk/YW8Xn3XzGWOSP+GtkYKCgoKCgoLC1PEvL+VR/TWcQYMAAAAASUVORK5CYII="
          />
        </mask>
        <clipPath id="clipPath642" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath664" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath678" clipPathUnits="userSpaceOnUse">
          <path d="M285.84 397.2h78.24v47.52h-78.24z" clipRule="evenodd" />
        </clipPath>
        <mask id="mask682" width="1" height="1" x="0" y="0" maskUnits="userSpaceOnUse">
          <image
            width="1"
            height="1"
            imageRendering="optimizeSpeed"
            preserveAspectRatio="none"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAACDCAAAAAAlwOE7AAAAAXNCSVQI5gpbmQAABW9JREFUeJztnH1MlWUYxp/3HA4HUL4k+YigEwEigQlaobIWoYhJfpUsolFpariZbpaLsmkkjnBjNB3Z8CMXa8EaNgohRyxyYJixRoIICUYJIV+BCOd4Pp7+sBYiV673ffXZvb2///jvurb3eu77uZ/7wJiGhoaGhoaGhoZ66EULUAPfWWMW0RruBNMzO8wXs1xEy1AdffJ3Ns65bZNoISojRZWMc845561eorWoiv+7A/xvKtxFi1ER141tjn+M8XZf0XJUQ7+kzsYn8L5oQWoReWyc38TgkjjRmtRgZk4fn8x4532iZSnGLf3CLb445/0LRAtTiD6xxjaVMd40TbQ0RUgRxdem9MX5D6SPR9+3rwBftpOzRYtTgMtLLQ5g7PedrqLVyUf/xLdTB4xz3hklWp0CwotQwDjnljWi5clmxq4/sC/OeaUkWqE8XNa2AEeOy8dGObeeSBYtURa6x7+2AmMDe8N0h+3nthpFa5SDFHpkFPgaK31YYswvheYNxucNFDDHmZWExzjG9CZQwRxtOzxEq5OP7pEqFLD+XMq91IOFV4EvS+kioqc8Y4x5ZV0GvnjjkyTPwhsYV6GA8e53QkWrk4+04CsUsKH3ggl/iKaDKGDm6nmEfXlvRQFz1K8hPOV2XtuIAtaRSbmCxXx5HQVsf5BodQowFQwDX5Yv4ggHzGN7FwpYawbhCua8/EcUsK4sk2h18pHmH7egD7GA8vDXPx8GrDqB8EnvkQkD1rDCSbQ6+RhWnrEDY91v0bwuM8YYk6LKUMBGPwwRrU4BQXlDwJe1NkUnWp183Ld0Al/25ucIVzBD0vcoYL+97iNanXykmFIz8DV2NFy0OgX45qKAXa+KI/whTl/fgaZt3WkG0erko3+qHgWsZ7cf3Z5eivgMVrDKYNHqFBCwZxAF7MQywi2i67pf0F2lOZXwweGUcApN23r33StanXyk6OIx4Ota8SzR6hTgk90PfFlPLyR8V5mW0YYqWPt6T9Hq5KNbXIs2HoazCbeILPQT1CKOfhxG+OHSdxcKmK0qnvAdzPgCChhv30C5gsXXoArWk0N5nD37KFopMhdRvoN570Q7e9bapwlXMNe0FnBXcTS/SLj11S2shitFefeIVqcA06ER4Gvs03C6d0s2I6sX+LKfTSJcwQyp51GLeOllykuxj51ED7J9OYTvYCzsI7SzZymNFS1OAZ47eoAva30S4ZPe5dkmVMG6NriJVicf6dFKFLDBD0yi1SkgqPBPFLBTDxGuYN7b0UqRvW4V4dUbJ7iz5/h1I+GA6WIrUMAG9geIVqeAoAOoRbR8HkU4YO7bLqGANSY7i1YnH+OKRvRe1LWF8I+3pdhy+F6UH0j4QwwsQO9F5qpYwlNEz9fgStHZ5YQDpk+BAevJoRywOcfROHuo0EQ4YAH5qEW0ls8l7Mtt80Xgy/5TKuGAGZY1wIBto7yzN6cMBWzkQIxodQrwz0PvRZaKeYSnbe6vwpWi1tWEA6Zf2oAeZHtyCI+zpcgStPEwXEj5d1N+uQPAl7UmgbAvl1cuoIA1P0N4iui0uA4GLJ/wxoMUWTIOfI0eDBOtTgEz9+AH2TjCdzC3dXCl6Fwa5ZWixG9QwHrfJFzBWBj8L0Ujh0IIn/TMUAd82aoTCbeIjLEHwO2ybTPhB1nGGGPRUw7cruylPM6+gVfrrb7MRyJEy1KDjMFJ7xDW05R/wDcBw/1FNxlrTSf8XjSJ4InP6ePxouX8L/67PxrmSf/WLSfXcsedlqMitylM/dYJfywiNfq9jbO5zowx3rH7PGOOypS+uyLp7hBQ1sUHsgPZ6qs/P0+4AZ4KKWTTfIkxXTSpL1FDQ0NDQ0NDQxR/Aej/N5fQaRBeAAAAAElFTkSuQmCC"
          />
        </mask>
        <clipPath id="clipPath698" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath714" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath730" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath746" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath760" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath782" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath798" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath814" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath830" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath850" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath864" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath876" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath888" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath904" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath934" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath944" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath974" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath984" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath994" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1004" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1018" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1028" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1050" clipPathUnits="userSpaceOnUse">
          <path d="M859.56 168.96h16.92v36.36h-16.92z" clipRule="evenodd" />
        </clipPath>
        <mask id="mask1054" width="1" height="1" x="0" y="0" maskUnits="userSpaceOnUse">
          <image
            width="1"
            height="1"
            imageRendering="optimizeSpeed"
            preserveAspectRatio="none"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAABvCAAAAABkhqd6AAAAAXNCSVQI5gpbmQAAAgRJREFUWIXtWL1OxDAM/lIOBCMjPADMiA3BhsTEAzCxMjLzALAiZl6AEYnXYGJmYUAIgRiQ+JEOzNBrYsdOLqp0R0H1crnP/mzHdd2mDkqo/nFaA1tDGV0Cp6x2JBX/sxFRYheGp5nh2DwUJjefLgXLrTZyjZG7BwDsmul5DhGJDVwyZIcaWWahSWcSIOFL1C0WbW5wlnIetGzGuwH4FimIpWayboFh00YJRqgCszVIyH/jDArtWMVdYRx+kUjH8erkEJlgDdyFX2473Tsit753ElLaOzhtFofGfWrWWvROi9xKe1RIae/wdWkNOKnL17TLnGnNqo7VoO+3X+IU1vqb1fq6xXyb5H4O2Lp/zk2R08+qvzGr7BNirbqNAH3gU/cPMJw14iTPiPsAgMGejiMo0bsyaW+sBvb7dORIJp1QGpEq4DlgD7J8Rl4jIHEKRQQHaoVFv35UlMQpzz5PypPlKxHRmsUxKXQs/dZx/ahMtI+vrE+x8paZjsOJ9KLndCpQiJPxHsl7izg+UMfmDgC8NIvJ1M0BOIuQFn2AjDkAHFlgQV8TEdEqj+wDf87ZmcV3Ubv7FHfB1Y1FMZct5o5Ued2TSw1FPUcjSc1ROei5nNfYiulNfb/isDHEOInmPfTVQFeRrXx/M8WavWNYujL8WfJhMfLfOrHgtgoYljQ7f0ta/ADjCi4/C+3lSQAAAABJRU5ErkJggg=="
          />
        </mask>
        <clipPath id="clipPath1066" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1076" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1092" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1108" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1134" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1146" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1156" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1166" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1176" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1186" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1196" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1206" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1216" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1226" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1236" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1246" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1256" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1266" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1276" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1286" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1296" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1306" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1316" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1326" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1336" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1346" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1356" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1366" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1376" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1386" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1396" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1406" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1416" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1426" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1436" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1446" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1456" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1466" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1476" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1486" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1496" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1506" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1516" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1526" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1536" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1546" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1556" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1566" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1576" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1586" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1596" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1606" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1616" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <linearGradient
          id="linearGradient1636"
          x1="224.88"
          x2="224.88"
          y1="359.1"
          y2="116.94"
          gradientUnits="userSpaceOnUse"
          spreadMethod="pad"
        >
          <stop offset="0" stopColor="#b4c7e7" stopOpacity="1" />
          <stop offset="0.085" stopColor="#b4c7e7" stopOpacity="1" />
          <stop offset="0.375" stopColor="#fcc" stopOpacity="1" />
          <stop offset="0.5" stopColor="#fcc" stopOpacity="1" />
          <stop offset="0.625" stopColor="#fcc" stopOpacity="1" />
          <stop offset="0.915" stopColor="#b4c7e7" stopOpacity="1" />
          <stop offset="1" stopColor="#b4c7e7" stopOpacity="1" />
        </linearGradient>
        <clipPath id="clipPath1654" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1670" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1692" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1712" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1722" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1738" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1748" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1762" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1778" clipPathUnits="userSpaceOnUse">
          <path d="M0 540h960V0H0" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1792" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1810" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1828" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1852" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
        <clipPath id="clipPath1868" clipPathUnits="userSpaceOnUse">
          <path d="M0 0h960v540H0z" clipRule="evenodd" />
        </clipPath>
      </defs>
      <g transform="matrix(1.33333 0 0 -1.33333 0 720)">
        <g>
          <g clipPath="url(#clipPath18)">
            <path
              fill="url(#linearGradient34)"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M0 0h960v540H0z"
            />
          </g>
        </g>
        <path
          fill="#dae3f3"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M28.2 466.12c0 5.55 4.494 10.04 10.038 10.04H541c5.55 0 10.04-4.49 10.04-10.04V349.28c0-5.55-4.49-10.04-10.04-10.04H38.238A10.036 10.036 0 0028.2 349.28z"
        />
        <path
          fill="#767171"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M79.56 452.88l-5.82-6.84-5.82 6.84z"
        />
        <path
          fill="none"
          stroke="#767171"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M79.56 452.88l-5.82-6.84-5.82 6.84z"
        />
        <path
          fill="none"
          stroke="#767171"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M73.68 446.04v-72.1"
        />
        <path
          fill="none"
          stroke="#00b050"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.04"
          d="M68.1 437.34h11.267"
        />
        <path
          fill="#dae3f3"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M555.24 468.83c0 4.05 3.28 7.33 7.33 7.33h163.66c4.05 0 7.33-3.28 7.33-7.33v-121.9c0-4.05-3.28-7.33-7.33-7.33H562.57c-4.05 0-7.33 3.28-7.33 7.33z"
        />
        <path
          fill="#e2f0d9"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M554.16 325.32c0 5.11 4.13 9.24 9.24 9.24h360.48c5.1 0 9.24-4.13 9.24-9.24V89.996c0-5.101-4.14-9.236-9.24-9.236H563.4a9.234 9.234 0 00-9.24 9.236z"
        />
        <path
          fill="none"
          stroke="#ffc000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M644.34 354.78l-.6-197.65"
        />
        <g>
          <g clipPath="url(#clipPath60)">
            <text
              fill="#dae3f3"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="24"
              fontVariant="normal"
              fontWeight="bold"
              transform="matrix(1 0 0 -1 46.68 500.9)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                Operating status
              </tspan>
            </text>
          </g>
        </g>
        {/* <g>
          <g clipPath="url(#clipPath72)">
            <text
              fill="#dae3f3"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="24"
              fontVariant="normal"
              fontWeight="bold"
              transform="matrix(1 0 0 -1 151.44 500.9)"
              writingMode="lr-tb"
            >
              <tspan x="0 9.3599997 17.4 29.040001 37.368 50.16" y="0">
                status
              </tspan>
            </text>
          </g>
        </g> */}
        <path
          fill="none"
          stroke="#bdd7ee"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M47.52 486.12h886.32"
        />
        <path
          fill="#dae3f3"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M737.88 468.26c0 4.03 3.27 7.3 7.3 7.3h180.64c4.03 0 7.3-3.27 7.3-7.3V346.9c0-4.03-3.27-7.3-7.3-7.3H745.18c-4.03 0-7.3 3.27-7.3 7.3z"
        />
        <path
          fill="#dae3f3"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M28.2 326.58a7.02 7.02 0 007.024 7.02H544.02c3.88 0 7.02-3.14 7.02-7.02V87.784a7.02 7.02 0 00-7.02-7.024H35.224a7.024 7.024 0 00-7.024 7.024z"
        />
        <g>
          <g clipPath="url(#clipPath90)">
            <g transform="matrix(25.56 0 0 45.48 825 347.52)">
              <image
                width="1"
                height="1"
                imageRendering="optimizeSpeed"
                mask="url(#mask94)"
                preserveAspectRatio="none"
                transform="matrix(1 0 0 -1 0 1)"
                xlinkHref="data:image/png;base64,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"
              />
            </g>
          </g>
        </g>
        <path
          fill="none"
          stroke="#0070c0"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M256.02 120.42h191.25"
        />
        <path
          fill="none"
          stroke="red"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M307.2 311.28h49.69"
        />
        <path
          fill="none"
          stroke="red"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M122.46 362.94l234.23-1.29"
        />
        <path
          fill="none"
          stroke="red"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M123.06 434.94v-73.3"
        />
        <path
          fill="none"
          stroke="#4472c4"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M72.78 129.3h108.4"
        />
        <path
          fill="none"
          stroke="#4472c4"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M74.151 375.3L73.5 129.29"
        />
        <path
          fill="none"
          stroke="#4472c4"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M74.1 403.86v-29.71"
        />
        <path
          fill="none"
          stroke="#4472c4"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M128.7 374.1h173.81"
        />
        <path
          fill="none"
          stroke="#ffc000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M102.66 421.62v-70.65"
        />
        <path
          fill="none"
          stroke="#767171"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M63.96 168.47l9.523.13"
        />
        <g>
          <g clipPath="url(#clipPath126)">
            <path
              fill="#767171"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M58.2 162.72l6.84 5.82-6.84 5.82z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath136)">
            <path
              fill="none"
              stroke="#767171"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.96"
              d="M58.2 162.72l6.84 5.82-6.84 5.82z"
            />
          </g>
        </g>
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M73.68 294.12H356.8"
        />
        <path
          fill="none"
          stroke="#0070c0"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M74.16 312.24h141.55"
        />
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M73.68 277.32H356.8"
        />
        <g>
          <g clipPath="url(#clipPath152)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 778.87 452.3)"
              writingMode="lr-tb"
            >
              <tspan x="0 5.994 10.674 13.689 17.153999 19.197001 23.877001 28.313999" y="0">
                Outside{' '}
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath164)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 809.47 452.3)"
              writingMode="lr-tb"
            >
              <tspan
                x="0 3.0150001 7.4429998 14.634 19.323 23.76 26.900999 31.212 34.200001 38.880001 42.021"
                y="0"
              >
                temperature
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath176)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 779.14 423.53)"
              writingMode="lr-tb"
            >
              <tspan
                x="0 2.2679999 5.4089999 8.5229998 12.834 17.523001 19.566 23.877001 26.892 28.926001 33.714001"
                y="0"
              >
                Irradiation
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath188)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 779.4 394.2)"
              writingMode="lr-tb"
            >
              <tspan x="0 8.0279999 10.071 14.751" y="0">
                Wind
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath200)">
            <g transform="matrix(18.48 0 0 18.6 749.88 388.2)">
              <image
                width="1"
                height="1"
                imageRendering="optimizeSpeed"
                mask="url(#mask204)"
                preserveAspectRatio="none"
                transform="matrix(1 0 0 -1 0 1)"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAABHNCSVQICAgIfAhkiAAABIxJREFUaIHtWUtsG1UUPW9m/M/HNnEc24kUPhGNAiklVEkRahARVEjAAvFZAEJ0gYSQQCXQCKlFbCgLVIGoBKKCDRFCYsGCTQXEIFIQUBqqEIoIv4KwHYMT20n8Hc+8YQF2O/WM/cZ2mknEWc2979479+i9d+97MwSAgm0CbrMTaCX+J2NWCI048U4fHL6dUBQZ+b/nQQspmGHrESNZtPVPwDN4n+bYyvxbyMVOtSqvhsBMpnvPs7C5+2vaZGNzSM4fb0FajYFpz7j69lYRkfJJSIW02i44AkfPSMuSMwqGPUPgveaBiiSLGcTCk+eHOQtCE0fBCTYAgHd4P6LxuVbnyYS6M8PbPSpZRQQAaAlLs4fPB+QFEMHZmuwMoi4Zm/vyyrMsZjRtaHFV7eMdaDghQniAszbkW3eZiZmlyrOUX2aLqlBDSXCWdnh3PgKHb0ill8UsUmffQZ5x2dYlI2ViSMy9BktbEOu/ndBJpk0li+lfmV4OAB1X3YnOgTs0x3irC127HoVcXEfs0ylAkWvGMtRn9NAz/gIszi4AAKUSoh8+zuTnHrwf7f23ML/nzxOPAdCf9aaOM5zdg8D4kQoRAFhdfJ/JV3AFDBEBAP/e52vHBAh6bzsGwlsMBdZCKZtA5vcwk61v95NVusLKj0idfRdycQ2Onutx2bUPqcatLj+I4IQi5TRjcsGJl1pDJJdAfPYQs73gUJf8TPQrJE69DCkbhyLlkIt8jsjMZJWfe8fdujG55W/fYM9YAwqVsHzmOOKfsROxuq+o0qUX3q6OXcqguBZR6VyhPbpxBTH1M6KfTIGzGGx0CoVcSEGRi8b8APC2zupwOpVKTJ2DraO3IhNOvwALAECLadBiWteo1SgkvlPJ+ZVFXVvrRWdCheqX54buM81CoTIiM5NwD94LMfkLspGTurbWjpBKzi2d1rVtSZ/ZKFzYv8qIhp8BFdc07TdlZmqCELT1jaNzxz3gNKqsHhHgPzK9+14H4cz/OSDy8YGa41z3jYe2BJH4F0d0m2UZAi2tX6J0Gkc0/DSoWD9PAkAx4zJTqIzkwjRysS+ZfUxdzYzCXNPRJLYVGUN9hhB+o/Jggt75rQwmMoIrgECdi9GlRO6vM0guTEMpZVV6pgLQd3tz14SNQjb2DZLzb1bkLb1nXMHdCN36SkVmIrOyML1hCTULTnDAf9NzAIz0GcKBt3tBNrEr8S4fOgfugs1TfVONhg9uzaZp816N7tGnVDpKZXPuGWdwFJ6hB8FpXK8BoJhcRDb6tUrHcbz5ZsY7vB+u0GhFjs4cAC1pn5YvrrKmmxmH/zqVbO8a0rGshunIKLKoku3+Xcy+piNTWo+pZFdgRPMXh2/sYJXOdGSS31f3tL59x+DouQEAAWdtR/fYFOyeK1U2VJLMVwAAIHDzixAcXkM+kY+eMN/MAMDS7GEolP2H1epPH0CRi+acGQAgvA3BiaOan5suROqH95D5498/D6YlU4YzOAbv8MMgRL2IiulzWD79qqoHmZ5MGYTwILwVlMoAFbVtsEXIsMCUBaBRbCsy/wDYYGMv9/V4TgAAAABJRU5ErkJggg=="
              />
            </g>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath216)">
            <g transform="translate(748.8 442.44) scale(20.52)">
              <image
                width="1"
                height="1"
                imageRendering="optimizeSpeed"
                mask="url(#mask220)"
                preserveAspectRatio="none"
                transform="matrix(1 0 0 -1 0 1)"
                xlinkHref="data:image/png;base64,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"
              />
            </g>
          </g>
        </g>
        <path
          fill="none"
          stroke="#2f5597"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M749.16 416.1l10.04 5.34"
        />
        <path
          fill="none"
          stroke="#2f5597"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M768.85 416.15l-9.73 5.17"
        />
        <path
          fill="none"
          stroke="#2f5597"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M767.31 425.69l-8.55 2.83"
        />
        <path
          fill="none"
          stroke="#2f5597"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M764 431.88l-5.24-1.79"
        />
        <path
          fill="none"
          stroke="#2f5597"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M754.16 428.52l-5.84-1.96"
        />
        <path
          fill="none"
          stroke="#2f5597"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M755.05 427.32l-5.41-7.49"
        />
        <path
          fill="none"
          stroke="#2f5597"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M756.6 426.84v-5.1"
        />
        <path
          fill="none"
          stroke="#2f5597"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M756.6 435.24v-3.44"
        />
        <path
          fill="none"
          stroke="#2f5597"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M757.92 431.28l1.99 2.64"
        />
        <path
          fill="none"
          stroke="#2f5597"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M762.17 421.43l-4.25 5.77"
        />
        <path
          fill="none"
          stroke="#2f5597"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M755.14 431.24l-2.26 3.16"
        />
        <path
          fill="none"
          stroke="#2f5597"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M754.13 430l-4.49 1.52"
        />
        <path
          fill="#2f5597"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M754.68 429.3c0 1.03.83 1.86 1.86 1.86 1.03 0 1.86-.83 1.86-1.86 0-1.03-.83-1.86-1.86-1.86-1.03 0-1.86.83-1.86 1.86z"
        />
        <path
          fill="none"
          stroke="#2f5597"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M754.68 429.3c0 1.03.83 1.86 1.86 1.86 1.03 0 1.86-.83 1.86-1.86 0-1.03-.83-1.86-1.86-1.86-1.03 0-1.86.83-1.86 1.86z"
        />
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M48.6 179.76h48.12v12.6H48.6z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M48.6 179.76h48.12v12.6H48.6z"
        />
        <g>
          <g clipPath="url(#clipPath264)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 47.984 182.98)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[2.2]] && `${Math.round(apiValues?.[keys?.[2.2]])} hPa`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M258.96 304.92h48.24v12.6h-48.24z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M258.96 304.92h48.24v12.6h-48.24z"
        />
        <g>
          <g clipPath="url(#clipPath280)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 270.39 308.18)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[3.2]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[3.2]])} °C`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M179.88 304.92H228v12.6h-48.12z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M179.88 304.92H228v12.6h-48.12z"
        />
        <g>
          <g clipPath="url(#clipPath296)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 190.26 308.18)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[3.1]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[3.1]])} °C`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M209.52 270.84h48.24v12.6h-48.24z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M209.52 270.84h48.24v12.6h-48.24z"
        />
        <g>
          <g clipPath="url(#clipPath312)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 220.95 274.06)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[3.3]] && `${Math.round(apiValues?.[keys?.[3.3]])} W`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M209.52 287.88h48.24v12.6h-48.24z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M209.52 287.88h48.24v12.6h-48.24z"
        />
        <g>
          <g clipPath="url(#clipPath328)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 220.95 291.12)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[3.4]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[3.4]])} m³/h`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M860.28 449.28h56.76v12.48h-56.76z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M860.28 449.28h56.76v12.48h-56.76z"
        />
        <g>
          <g clipPath="url(#clipPath344)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 875.06 452.5)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[9.1]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[9.1]])} °C`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M860.28 419.64h56.76v12.6h-56.76z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M860.28 419.64h56.76v12.6h-56.76z"
        />
        <g>
          <g clipPath="url(#clipPath360)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 866.06 422.93)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[9.2]] && `${Math.round(apiValues?.[keys?.[9.2]])} W/m²`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M860.28 390.6h56.76v12.6h-56.76z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M860.28 390.6h56.76v12.6h-56.76z"
        />
        <g>
          <g clipPath="url(#clipPath376)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 875.06 393.86)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[9.3]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[9.3]])} m/s`}
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <path
            fill="none"
            stroke="#00b050"
            strokeDasharray="0.48, 0.48"
            strokeDashoffset="0"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeOpacity="1"
            strokeWidth="0.48"
            d="M57 437.52l89.63-.18"
          />
        </g>
        <path
          fill="none"
          stroke="red"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M403.02 178.62h56.69"
        />
        <path
          fill="none"
          stroke="red"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M356.82 360.78V210.64"
        />
        <g>
          <g clipPath="url(#clipPath396)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 576.1 452.78)"
              writingMode="lr-tb"
            >
              <tspan x="0 4.6529999 9.8280001" y="0">
                PV{' '}
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath408)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 587.86 452.78)"
              writingMode="lr-tb"
            >
              <tspan
                x="0 4.4369998 6.48 10.917 14.751 17.766001 20.871 22.914 26.747999 28.791 31.806"
                y="0"
              >
                electricity
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath420)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 626.02 452.78)"
              writingMode="lr-tb"
            >
              <tspan x="0 4.0770001 6.1199999 10.557 12.6" y="0">
                yield
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M657.24 448.92H714v12.6h-56.76z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M657.24 448.92H714v12.6h-56.76z"
        />
        <g>
          <g clipPath="url(#clipPath436)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 671.02 452.18)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[8.1]] && `${Math.round(apiValues?.[keys?.[8.1]])} W`}
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath448)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 576.31 428.35)"
              writingMode="lr-tb"
            >
              <tspan x="0 4.6529999 9.8280001" y="0">
                PV{' '}
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath460)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 588.07 428.35)"
              writingMode="lr-tb"
            >
              <tspan x="0 4.0770001 6.1199999 10.557 12.6" y="0">
                yield
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath472)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 607.63 428.35)"
              writingMode="lr-tb"
            >
              <tspan x="0 3.0150001 7.7940001 12.474 16.785" y="0">
                today
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M657.48 424.44h56.76v12.6h-56.76z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M657.48 424.44h56.76v12.6h-56.76z"
        />
        <g>
          <g clipPath="url(#clipPath488)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 659.23 427.73)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[8.2]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[8.2]])} kWh`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="none"
          stroke="#ffc000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M101.94 351.54h531.51"
        />
        <g>
          <g clipPath="url(#clipPath502)">
            <path
              fill="#fff"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M631.68 382.8h23.76l-23.76-39.12z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath512)">
            <path
              fill="none"
              stroke="#000"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.96"
              d="M631.68 382.8h23.76l-23.76-39.12z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath522)">
            <path
              fill="#fff"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M655.44 343.68h-23.76l23.76 39.12z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath532)">
            <path
              fill="none"
              stroke="#000"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.96"
              d="M655.44 343.68h-23.76l23.76 39.12z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath542)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="14.04"
              fontVariant="normal"
              fontWeight="bold"
              transform="matrix(1 0 0 -1 637.13 373.08)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                =
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath554)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="14.064"
              fontVariant="normal"
              fontWeight="bold"
              transform="matrix(1 0 0 -1 644.11 349.34)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                ~
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="none"
          stroke="red"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M122.76 408h22.28"
        />
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M130.8 401.52h48.12V414H130.8z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M130.8 401.52h48.12V414H130.8z"
        />
        <g>
          <g clipPath="url(#clipPath572)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 140.9 404.71)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.T_coll_backfeed_1 &&
                  `${roundToOneDecimalPlace(apiValues?.T_coll_backfeed_1)} °C`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M275.52 146.64h85.03"
        />
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M274.92 138.36h85.03"
        />
        <g>
          <path
            fill="url(#linearGradient598)"
            fillOpacity="1"
            fillRule="evenodd"
            stroke="none"
            d="M320.78 238.02h70.16c9.19 0 16.64-24.63 16.64-55.02 0-30.39-7.45-55.02-16.64-55.02h-70.16c-9.19 0-16.64 24.63-16.64 55.02 0 30.39 7.45 55.02 16.64 55.02z"
          />
        </g>
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M320.78 238.02h70.16c9.19 0 16.64-24.63 16.64-55.02 0-30.39-7.45-55.02-16.64-55.02h-70.16c-9.19 0-16.64 24.63-16.64 55.02 0 30.39 7.45 55.02 16.64 55.02z"
        />
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M345.84 172.92h48.24v12.6h-48.24z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M345.84 172.92h48.24v12.6h-48.24z"
        />
        <g>
          <g clipPath="url(#clipPath614)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 359.3 176.14)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[1.1]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[1.1]])} °C`}
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath626)">
            <g transform="matrix(78.12 0 0 47.64 61.44 397.32)">
              <image
                width="1"
                height="1"
                imageRendering="optimizeSpeed"
                mask="url(#mask630)"
                preserveAspectRatio="none"
                transform="matrix(1 0 0 -1 0 1)"
                xlinkHref="data:image/png;base64,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"
              />
            </g>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath642)">
            <path
              fill="none"
              stroke="#000"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M121.22 434.91l-7.01-4.08"
            />
          </g>
        </g>
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M116.88 454.56v-22.68"
        />
        <path
          fill="none"
          stroke="red"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M356.94 433.74v-73.3"
        />
        <path
          fill="none"
          stroke="#4472c4"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M301.14 403.62v-29.71"
        />
        <path
          fill="none"
          stroke="red"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M356.64 407.76h22.28"
        />
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M364.68 401.28h48.12v12.6h-48.12z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M364.68 401.28h48.12v12.6h-48.12z"
        />
        <g>
          <g clipPath="url(#clipPath664)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 375.81 404.57)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[2.25]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[2.25]])} °C`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="none"
          stroke="#ffc000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M334.62 421.98v-70.65"
        />
        <g>
          <g clipPath="url(#clipPath678)">
            <g transform="matrix(78.24 0 0 47.52 285.84 397.2)">
              <image
                width="1"
                height="1"
                imageRendering="optimizeSpeed"
                mask="url(#mask682)"
                preserveAspectRatio="none"
                transform="matrix(1 0 0 -1 0 1)"
                xlinkHref="data:image/png;base64,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"
              />
            </g>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M110.88 453.84h48.24v12.48h-48.24z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M110.88 453.84h48.24v12.48h-48.24z"
        />
        <g>
          <g clipPath="url(#clipPath698)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 127.03 457.08)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.T_coll_surface_3 && `${Math.round(apiValues?.T_coll_surface_3)} °C`}
              </tspan>
            </text>
          </g>
        </g>
        {apiValues?.[keys?.[2.4]] && apiValues?.[keys?.[2.4]] >= 1 && (
          <>
            <path
              fill="#e2f0d9"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M51.12 431.4h48.12v12.48H51.12z"
            />
            <path
              fill="none"
              stroke="#00b050"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.96"
              d="M51.12 431.4h48.12v12.48H51.12z"
            />
            <g>
              <g clipPath="url(#clipPath714)">
                <text
                  fill="#00b050"
                  fillOpacity="1"
                  fillRule="nonzero"
                  stroke="none"
                  fontFamily="Calibri"
                  fontSize="9"
                  fontVariant="normal"
                  fontWeight="normal"
                  transform="matrix(1 0 0 -1 69.456 434.59)"
                  writingMode="lr-tb"
                >
                  <tspan x="0 4.5630002 6.8309999" y="0">
                    Full
                  </tspan>
                </text>
              </g>
            </g>
          </>
        )}
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M50.76 453.96H99v12.48H50.76z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M50.76 453.96H99v12.48H50.76z"
        />
        <g>
          <g clipPath="url(#clipPath730)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 59.192 457.18)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[2.3]] && `${Math.round(apiValues?.[keys?.[2.3]])}  hPa`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M66.48 134.4l6.06 10.2 6.06-10.2z"
        />
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M66.48 134.4l6.06 10.2 6.06-10.2z"
        />
        <g>
          <g clipPath="url(#clipPath746)">
            <path
              fill="none"
              stroke="#000"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="2.28"
              d="M65.82 144.42h13.069"
            />
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M48.84 113.4h48.12V126H48.84z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M48.84 113.4h48.12V126H48.84z"
        />
        <g>
          <g clipPath="url(#clipPath760)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 60.224 116.59)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[2.1]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[2.1]])} %`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#767171"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M306.72 452.76l-5.82-6.84-5.82 6.84z"
        />
        <path
          fill="none"
          stroke="#767171"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M306.72 452.76l-5.82-6.84-5.82 6.84z"
        />
        <path
          fill="none"
          stroke="#767171"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M300.84 445.92v-72.1"
        />
        <path
          fill="none"
          stroke="#00b050"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.04"
          d="M295.26 437.1h11.27"
        />
        <path
          fill="none"
          stroke="#4472c4"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M301.14 403.62v-29.71"
        />
        <g>
          <g clipPath="url(#clipPath782)">
            <path
              fill="none"
              stroke="#000"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M348.37 434.73l-7.01-4.08"
            />
          </g>
        </g>
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M344.04 454.32v-22.68"
        />
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M338.04 453.6h48.24v12.6h-48.24z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M338.04 453.6h48.24v12.6h-48.24z"
        />
        <g>
          <g clipPath="url(#clipPath798)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 350.19 456.89)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.T_coll_surface_2 &&
                  `${roundToOneDecimalPlace(apiValues?.T_coll_surface_2)} °C`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M277.92 453.72h48.24v12.6h-48.24z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M277.92 453.72h48.24v12.6h-48.24z"
        />
        <g>
          <g clipPath="url(#clipPath814)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9.024"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 290.35 457.01)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[2.3]] && `${Math.round(apiValues?.[keys?.[2.3]])}  hPa`}
              </tspan>
            </text>
          </g>
        </g>
        {/* <path
          fill="#dae3f3"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M764.04 529.02a5.94 5.94 0 005.94 5.94h157.2a5.94 5.94 0 005.94-5.94v-23.76a5.94 5.94 0 00-5.94-5.94h-157.2a5.94 5.94 0 00-5.94 5.94z"
        />
        <path
          fill="none"
          stroke="red"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M764.04 529.02a5.94 5.94 0 005.94 5.94h157.2a5.94 5.94 0 005.94-5.94v-23.76a5.94 5.94 0 00-5.94-5.94h-157.2a5.94 5.94 0 00-5.94 5.94z"
        />
        <g>
          <g clipPath="url(#clipPath830)">
            <text
              fill="red"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="18.024"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 825.19 511.15)"
              writingMode="lr-tb"
            >
              <tspan x="0 9.318408 14.8698 18.943224 25.774321 31.542 40.517952" y="0">
                Pfister
              </tspan>
            </text>
          </g>
        </g> */}
        <g>
          <path
            fill="none"
            stroke="#00b050"
            strokeDasharray="0.48, 0.48"
            strokeDashoffset="0"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeOpacity="1"
            strokeWidth="0.48"
            d="M278.76 437.4l89.63-.18"
          />
        </g>
        {apiValues?.[keys?.[2.24]] && apiValues?.[keys?.[2.24]] >= 1 && (
          <>
            <path
              fill="#e2f0d9"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M279.48 431.16h48.12v12.6h-48.12z"
            />
            <path
              fill="none"
              stroke="#00b050"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.96"
              d="M279.48 431.16h48.12v12.6h-48.12z"
            />
            <g>
              <g clipPath="url(#clipPath850)">
                <text
                  fill="#00b050"
                  fillOpacity="1"
                  fillRule="nonzero"
                  stroke="none"
                  fontFamily="Calibri"
                  fontSize="9"
                  fontVariant="normal"
                  fontWeight="normal"
                  transform="matrix(1 0 0 -1 295.61 434.42)"
                  writingMode="lr-tb"
                >
                  <tspan x="0 4.5630002 6.8309999 11.394" y="0">
                    Full
                  </tspan>
                </text>
              </g>
            </g>
          </>
        )}
        <path
          fill="none"
          stroke="#0070c0"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M256.02 120.42h585.03"
        />
        <g>
          <g clipPath="url(#clipPath864)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 412.54 230.09)"
              writingMode="lr-tb"
            >
              <tspan x="0 5.6339998 10.071 14.382" y="0">
                Heat
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath876)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 431.86 230.09)"
              writingMode="lr-tb"
            >
              <tspan x="0 4.0770001 6.1199999 10.557 12.6" y="0">
                yield
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath888)">
            <text
              fill="#000"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 451.54 230.09)"
              writingMode="lr-tb"
            >
              <tspan x="0 3.0150001 7.7940001 12.474 16.785" y="0">
                today
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M483 226.32h56.76v12.48H483z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M483 226.32h56.76v12.48H483z"
        />
        <g>
          <g clipPath="url(#clipPath904)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 503.47 229.49)"
              writingMode="lr-tb"
            >
              <tspan x="0 4.5630002 6.8309999 11.394" y="0">
                {/* {apiValues?.[keys?.[4.15]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[4.15]])} kWh`} */}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="none"
          stroke="#0070c0"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M835.98 114.09l9.39 10.89"
        />
        <path
          fill="none"
          stroke="red"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M458.34 179.1h382.68"
        />
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M536.28 112.96v8.24"
        />
        <path
          fill="#d9d9d9"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M629.16 114h75.6v73.32h-75.6z"
        />
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M629.16 114h75.6v73.32h-75.6z"
        />
        <path
          fill="none"
          stroke="#afabab"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M629.16 175.68h75.63"
        />
        <path
          fill="none"
          stroke="#afabab"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M629.16 127.2h75.63"
        />
        <path
          fill="#d0cece"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M631.8 126.3c0 3.61 2.5 6.54 5.58 6.54s5.58-2.93 5.58-6.54-2.5-6.54-5.58-6.54-5.58 2.93-5.58 6.54z"
        />
        <path
          fill="none"
          stroke="#afabab"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M631.8 126.3c0 3.61 2.5 6.54 5.58 6.54s5.58-2.93 5.58-6.54-2.5-6.54-5.58-6.54-5.58 2.93-5.58 6.54z"
        />
        <g>
          <g clipPath="url(#clipPath934)">
            <path
              fill="#d0cece"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M634.68 131.88l8.04-5.52-8.04-5.52z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath944)">
            <path
              fill="none"
              stroke="#afabab"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.96"
              d="M634.68 131.88l8.04-5.52-8.04-5.52z"
            />
          </g>
        </g>
        <path
          fill="#afabab"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M646.08 122.88v54.84l7.2-54.84z"
        />
        <path
          fill="none"
          stroke="#7f7f7f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M646.08 122.88v54.84l7.2-54.84z"
        />
        <path
          fill="#d0cece"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M653.28 182.52v-54.84l-7.2 54.84z"
        />
        <path
          fill="none"
          stroke="#7f7f7f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M653.28 182.52v-54.84l-7.2 54.84z"
        />
        <path
          fill="#afabab"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M678.36 122.88v54.84l7.32-54.84z"
        />
        <path
          fill="none"
          stroke="#7f7f7f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M678.36 122.88v54.84l7.32-54.84z"
        />
        <path
          fill="#d0cece"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M685.68 182.04V127.2l-7.32 54.84z"
        />
        <path
          fill="none"
          stroke="#7f7f7f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M685.68 182.04V127.2l-7.32 54.84z"
        />
        <path
          fill="#d0cece"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M689.52 175.62c0 3.61 2.47 6.54 5.52 6.54 3.05 0 5.52-2.93 5.52-6.54s-2.47-6.54-5.52-6.54c-3.05 0-5.52 2.93-5.52 6.54z"
        />
        <path
          fill="none"
          stroke="#afabab"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M689.52 175.62c0 3.61 2.47 6.54 5.52 6.54 3.05 0 5.52-2.93 5.52-6.54s-2.47-6.54-5.52-6.54c-3.05 0-5.52 2.93-5.52 6.54z"
        />
        <g>
          <g clipPath="url(#clipPath974)">
            <path
              fill="#d0cece"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M692.4 181.2l8.04-5.52-8.04-5.52z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath984)">
            <path
              fill="none"
              stroke="#afabab"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.96"
              d="M692.4 181.2l8.04-5.52-8.04-5.52z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath994)">
            <path
              fill="#d0cece"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M658.32 179.76l5.28-3.54-5.28-3.54z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1004)">
            <path
              fill="none"
              stroke="#afabab"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.96"
              d="M658.32 179.76l5.28-3.54-5.28-3.54z"
            />
          </g>
        </g>
        <path
          fill="#d0cece"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M663.48 176.28c0 1.19.81 2.16 1.8 2.16s1.8-.97 1.8-2.16c0-1.19-.81-2.16-1.8-2.16s-1.8.97-1.8 2.16z"
        />
        <path
          fill="none"
          stroke="#afabab"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M663.48 176.28c0 1.19.81 2.16 1.8 2.16s1.8-.97 1.8-2.16c0-1.19-.81-2.16-1.8-2.16s-1.8.97-1.8 2.16z"
        />
        <g>
          <g clipPath="url(#clipPath1018)">
            <path
              fill="#d0cece"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M672.72 172.68l-5.16 3.54 5.16 3.54z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1028)">
            <path
              fill="none"
              stroke="#afabab"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.96"
              d="M672.72 172.68l-5.16 3.54 5.16 3.54z"
            />
          </g>
        </g>
        <path
          fill="#d0cece"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M660.12 126.42c0 3.61 2.47 6.54 5.52 6.54 3.05 0 5.52-2.93 5.52-6.54s-2.47-6.54-5.52-6.54c-3.05 0-5.52 2.93-5.52 6.54z"
        />
        <path
          fill="none"
          stroke="#afabab"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M660.12 126.42c0 3.61 2.47 6.54 5.52 6.54 3.05 0 5.52-2.93 5.52-6.54s-2.47-6.54-5.52-6.54c-3.05 0-5.52 2.93-5.52 6.54z"
        />
        <path
          fill="none"
          stroke="#afabab"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M661.68 121.77l9.49 2.31"
        />
        <path
          fill="none"
          stroke="#afabab"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M661.68 131.04l9.49-2.31"
        />
        <path
          fill="none"
          stroke="red"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M835.62 172.77l9.39 10.89"
        />
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M514.08 120.53v58.63"
        />
        <g>
          <g clipPath="url(#clipPath1050)">
            <g transform="matrix(16.92 0 0 36.36 859.56 168.96)">
              <image
                width="1"
                height="1"
                imageRendering="optimizeSpeed"
                mask="url(#mask1054)"
                preserveAspectRatio="none"
                transform="matrix(1 0 0 -1 0 1)"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAABvCAYAAABB7fimAAAABHNCSVQICAgIfAhkiAAABExJREFUeJztnE9IVEEcx78+l0zNNMv0UGgYWkKIkKiZCaaGB+nUrWOwUFBR2KHyVocOFiQRdrBDx04hKG3+TQsFizLDLAlKNFK0XMJ1V906Jav73s5v5s17O67vc3P3937zPm/+7Oy4M3EA/kICtXUthu95OtwyimASBxMykQT0sFpKWIZXJBSrpLhldqbmovTYNdMFWyGk8YXHSREBzNWsEVw1I9rJ7RocyDJGN0S9mYrKO0hMSgt7/c1wM+ZmR0k5WJiS4X2qhUXnkZlVSM6TvqcAR4svMfP2dTfA7/fSZGSI8OYS6VOcA4B5ZN24HkIyvV0NUgqXDVMmNS037LVAwGvJzYTC24w9HW64WEElZXI+V0IZfHUbpeU3mHG8Qrb3GQDwer9bkjcqMlbhyKiKI6MqzKE5mvDMDDwdbnVrhneKU1vXIqdmxuszmDH5bbMyioqIsjUjgrIyng43pqeGSLHDQ3dpc7NoMjrSitGRVnK8sjUjgiOjKo6Mqig9mgFA3uEzzJjPY08BKCzDM53JyalGMBiMnWamaVrsyAAKDwCWLDVFk02x1GQVjoyqODKqElMySg/NW3qpSVkZERwZO3DmZhbdR1RwZFTFkVGVmJJRdmiuPvUQmkZ/1r9/fVO3ZnhEACBtV7a6MiIoK/Nx9AlXvNLTmanJAUxNDnBdo2zNiODIqIojoyoxJaPs0Aw4S02xgyNjB85Sk0X3ERW2jowVm9wilVV+4papHIYydor8Jzk5AydrHwhfrytjx+69D+8f674eH+9CZlaxUM4wGbu2If6YHjTMV1h0TigneQCwaguvUV6RZr5uNyDvXkzKj7M3YvRjbbP7QIGQmqmsaiIn669OFxIBjB+AjJpfk0lI2EEqYLw+A3sT400VyvMgeJqbBgAuVxIp+HVNOjkxCz0hs7WjAUBVzT1S4t3bzdXIRvSElpd9Ya+lpOwn5SOPZqJ9hMWV/MR1f/d0Xg6LKTt+k5RLV8auMy8AwJ0X3ldF0SgdzKpaMeLrRLvQdUrMmjc+rIkvz4TyKCFDoaqmmRmzaWRcrm3MmE0jQ8GRiQaBwB9mzKaR6e26yoxRQmbj14K8Q+xtJnpolE97OzaMhpJzoFroOu41ANk0jbH7AhVyM7Oqdh5NrJ8l6z3I/t5GUi4NoJ8FE1gNkpJSoT4gn2+GFMc1ABxpn+MJj4ieiNnmvSaz6Au/Ub3k+W2z+OQNmCqUp8kKLWgM9F7XDdATOt23INyHeFdneAg7eEpkyYf1fWfev4oyz7zh+zKWmQAOGZHkFGSJAAbnm9khVFBwFvuyK3TfG+hrxOIibQQLxfB8M1YbNiMVKffS0gJe9oidDxXxsDZKp+x8fgHB4AozjvIzxZmfI3j3VvxfGsyT5+ya2shovqYPOJSBrH7IdfRkVc19uFwJUgoG5I+OQse1pqYdREmZ+FF6yhzXqgerCa6s+NH94qLZYpj8A/ZHZ27grR6GAAAAAElFTkSuQmCC"
              />
            </g>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1066)">
            <path
              fill="#fff"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M454.92 185.52l10.2-6-10.2-6z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1076)">
            <path
              fill="none"
              stroke="#000"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.96"
              d="M454.92 185.52l10.2-6-10.2-6z"
            />
          </g>
        </g>
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M465.06 186.18v-13.07"
        />
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M491.88 99.72H540v12.48h-48.12z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M491.88 99.72H540v12.48h-48.12z"
        />
        <g>
          <g clipPath="url(#clipPath1092)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 505.26 102.84)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[4.2]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[4.2]])} °C`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M491.16 155.4h48.24V168h-48.24z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M491.16 155.4h48.24V168h-48.24z"
        />
        <g>
          <g clipPath="url(#clipPath1108)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 504.64 158.62)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[4.3]] && `${Math.round(apiValues?.[keys?.[4.3]])} W`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#000"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M544.2 112.92v70.56l15.48-70.56z"
        />
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M544.2 112.92v70.56l15.48-70.56z"
        />
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M559.68 187.68V117l-15.48 70.68z"
        />
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M559.68 187.68V117l-15.48 70.68z"
        />
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M536.4 179.32v8.24"
        />
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M492 187.56h48.12v12.48H492z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M492 187.56h48.12v12.48H492z"
        />
        <g>
          <g clipPath="url(#clipPath1134)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 505.38 190.75)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[4.1]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[4.1]])} °C`}
              </tspan>
            </text>
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1146)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M865.75 125.47c-.36.35-.36.92 0 1.28l3.62 3.62c.35.36.93.36 1.28 0 .35-.35.35-.92 0-1.28l-3.62-3.62a.894.894 0 00-1.28 0z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1156)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M865.75 125.47c-.36.35-.36.92 0 1.28l3.62 3.62c.35.36.93.36 1.28 0v0c.35-.35.35-.92 0-1.28l-3.62-3.62a.894.894 0 00-1.28 0z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1166)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M862.19 130.32c.36.36.94.36 1.3 0l3.5-3.49a.93.93 0 000-1.31.93.93 0 00-1.31 0l-3.49 3.49c-.37.36-.37.95 0 1.31z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1176)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M862.19 130.32c.36.36.94.36 1.3 0l3.5-3.49a.93.93 0 000-1.31v0a.93.93 0 00-1.31 0l-3.49 3.49c-.37.36-.37.95 0 1.31z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1186)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M866.34 132.12c.5 0 .9-.4.9-.9v-7.2c0-.5-.4-.9-.9-.9s-.9.4-.9.9v7.2c0 .5.4.9.9.9z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1196)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.48"
              d="M866.34 132.12c.5 0 .9-.4.9-.9v-7.2c0-.5-.4-.9-.9-.9v0c-.5 0-.9.4-.9.9v7.2c0 .5.4.9.9.9z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1206)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M862.71 120.97c-.25.43-.1.99.33 1.24l2.94 1.69a.9.9 0 001.23-.33c.25-.43.11-.99-.33-1.24l-2.93-1.69a.91.91 0 00-1.24.33z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1216)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M862.71 120.97c-.25.43-.1.99.33 1.24l2.94 1.69a.9.9 0 001.23-.33v0c.25-.43.11-.99-.33-1.24l-2.93-1.69a.91.91 0 00-1.24.33z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1226)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M861.26 122.43c-.49-.14-1 .16-1.13.65l-1.28 4.77c-.13.49.16 1 .66 1.13.49.14 1-.16 1.13-.65l1.28-4.77c.13-.5-.16-1-.66-1.13z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1236)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M861.26 122.43c-.49-.14-1 .16-1.13.65l-1.28 4.77c-.13.49.16 1 .66 1.13v0c.49.14 1-.16 1.13-.65l1.28-4.77c.13-.5-.16-1-.66-1.13z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1246)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M855.27 121.75c-.13.48.15.97.64 1.1l4.95 1.33a.91.91 0 001.11-.64.918.918 0 00-.64-1.11l-4.95-1.32a.898.898 0 00-1.11.64z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1256)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M855.27 121.75c-.13.48.15.97.64 1.1l4.95 1.33a.91.91 0 001.11-.64v0a.918.918 0 00-.64-1.11l-4.95-1.32a.898.898 0 00-1.11.64z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1266)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M855.7 126.3c.25.43.81.58 1.24.33l6.45-3.72c.44-.25.58-.81.33-1.24a.9.9 0 00-1.23-.33l-6.46 3.72c-.43.25-.58.81-.33 1.24z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1276)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M855.7 126.3c.25.43.81.58 1.24.33l6.45-3.72c.44-.25.58-.81.33-1.24v0a.9.9 0 00-1.23-.33l-6.46 3.72c-.43.25-.58.81-.33 1.24z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1286)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M863.82 117.48c-.5 0-.9.4-.9.9v3.36c0 .5.4.9.9.9s.9-.4.9-.9v-3.36c0-.5-.4-.9-.9-.9z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1296)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.48"
              d="M863.82 117.48c-.5 0-.9.4-.9.9v3.36c0 .5.4.9.9.9v0c.5 0 .9-.4.9-.9v-3.36c0-.5-.4-.9-.9-.9z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1306)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M861.75 116.92a.933.933 0 00-1.14-.66l-4.77 1.28c-.49.13-.78.64-.65 1.13.13.5.64.79 1.13.66l4.77-1.28c.5-.13.79-.64.66-1.13z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1316)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M861.75 116.92a.933.933 0 00-1.14-.66l-4.77 1.28c-.49.13-.78.64-.65 1.13v0c.13.5.64.79 1.13.66l4.77-1.28c.5-.13.79-.64.66-1.13z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1326)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M859.34 111.39c-.49.12-.77.62-.64 1.1l1.32 4.95a.905.905 0 101.75-.47l-1.32-4.94a.902.902 0 00-1.11-.64z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1336)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M859.34 111.39c-.49.12-.77.62-.64 1.1l1.32 4.95c.13.49.63.77 1.11.64v0c.48-.13.77-.62.64-1.11l-1.32-4.94a.902.902 0 00-1.11-.64z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1346)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M855.61 114.04c-.25.43-.1.99.33 1.24l6.46 3.72a.9.9 0 001.23-.33c.25-.43.1-.99-.33-1.24l-6.45-3.72a.912.912 0 00-1.24.33z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1356)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M855.61 114.04c-.25.43-.1.99.33 1.24l6.46 3.72a.9.9 0 001.23-.33v0c.25-.43.1-.99-.33-1.24l-6.45-3.72a.912.912 0 00-1.24.33z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1366)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M867.25 116.66a.916.916 0 00-1.26-.33l-2.81 1.62c-.44.25-.59.82-.34 1.26.26.44.82.59 1.26.34l2.81-1.62c.45-.26.6-.82.34-1.27z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1376)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M867.25 116.66a.916.916 0 00-1.26-.33l-2.81 1.62c-.44.25-.59.82-.34 1.26v0c.26.44.82.59 1.26.34l2.81-1.62c.45-.26.6-.82.34-1.27z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1386)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M866.98 114.67c.35-.36.35-.93 0-1.28l-3.62-3.63a.911.911 0 00-1.28 0c-.36.36-.36.93 0 1.28l3.62 3.63c.35.35.93.35 1.28 0z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1396)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M866.98 114.67c.35-.36.35-.93 0-1.28l-3.62-3.63a.911.911 0 00-1.28 0v0c-.36.36-.36.93 0 1.28l3.62 3.63c.35.35.93.35 1.28 0z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1406)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M870.54 109.81a.93.93 0 00-1.31 0l-3.49 3.5a.93.93 0 000 1.31c.36.36.94.36 1.31 0l3.49-3.5a.93.93 0 000-1.31z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1416)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M870.54 109.81a.93.93 0 00-1.31 0l-3.49 3.5a.93.93 0 000 1.31v0c.36.36.94.36 1.31 0l3.49-3.5a.93.93 0 000-1.31z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1426)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M866.4 108a.96.96 0 00-.96.96v7.08a.96.96 0 001.92 0v-7.08a.96.96 0 00-.96-.96z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1436)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.48"
              d="M866.4 108a.96.96 0 00-.96.96v7.08c0 .53.43.96.96.96v0c.53 0 .96-.43.96-.96v-7.08a.96.96 0 00-.96-.96z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1446)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M870.02 119.16c.25-.43.1-.98-.34-1.23l-2.93-1.7a.91.91 0 00-1.24.33c-.25.44-.1.99.33 1.24l2.94 1.7c.43.25.99.1 1.24-.34z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1456)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M870.02 119.16c.25-.43.1-.98-.34-1.23l-2.93-1.7a.91.91 0 00-1.24.33v0c-.25.44-.1.99.33 1.24l2.94 1.7c.43.25.99.1 1.24-.34z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1466)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M871.55 117.93c.49.13 1-.16 1.13-.65l1.28-4.77c.13-.5-.16-1-.65-1.14-.5-.13-1 .16-1.14.66l-1.27 4.77c-.14.49.16 1 .65 1.13z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1476)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M871.55 117.93c.49.13 1-.16 1.13-.65l1.28-4.77c.13-.5-.16-1-.65-1.14v0c-.5-.13-1 .16-1.14.66l-1.27 4.77c-.14.49.16 1 .65 1.13z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1486)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M877.55 118.61a.918.918 0 00-.64-1.11l-4.95-1.32a.898.898 0 00-1.11.64c-.13.48.15.98.64 1.11l4.95 1.32a.91.91 0 001.11-.64z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1496)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M877.55 118.61a.918.918 0 00-.64-1.11l-4.95-1.32a.898.898 0 00-1.11.64v0c-.13.48.15.98.64 1.11l4.95 1.32a.91.91 0 001.11-.64z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1506)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M877.11 114.06a.903.903 0 00-1.24-.33l-6.45 3.72c-.43.25-.58.81-.33 1.24a.9.9 0 001.23.33l6.46-3.73a.9.9 0 00.33-1.23z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1516)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M877.11 114.06a.903.903 0 00-1.24-.33l-6.45 3.72c-.43.25-.58.81-.33 1.24v0a.9.9 0 001.23.33l6.46-3.73a.9.9 0 00.33-1.23z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1526)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M869.04 122.88c.53 0 .96-.43.96-.96v-3.24a.96.96 0 00-1.92 0v3.24c0 .53.43.96.96.96z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1536)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.48"
              d="M869.04 122.88c.53 0 .96-.43.96-.96v-3.24a.96.96 0 00-.96-.96v0a.96.96 0 00-.96.96v3.24c0 .53.43.96.96.96z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1546)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M871.21 123.3c.14.5.64.79 1.14.66l4.77-1.28c.49-.13.78-.64.65-1.13a.923.923 0 00-1.13-.66l-4.77 1.28c-.5.13-.79.64-.66 1.13z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1556)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M871.21 123.3c.14.5.64.79 1.14.66l4.77-1.28c.49-.13.78-.64.65-1.13v0a.923.923 0 00-1.13-.66l-4.77 1.28c-.5.13-.79.64-.66 1.13z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1566)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M873.62 128.84c.49-.13.77-.63.64-1.11l-1.32-4.95a.91.91 0 00-1.11-.64c-.49.13-.77.62-.64 1.11l1.32 4.95c.13.48.63.77 1.11.64z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1576)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M873.62 128.84c.49-.13.77-.63.64-1.11l-1.32-4.95a.91.91 0 00-1.11-.64v0c-.49.13-.77.62-.64 1.11l1.32 4.95c.13.48.63.77 1.11.64z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1586)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M877.35 126.18c.25-.43.1-.99-.33-1.24l-6.46-3.72a.9.9 0 00-1.23.33c-.25.43-.1.99.33 1.24l6.45 3.72c.43.25.99.1 1.24-.33z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1596)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M877.35 126.18c.25-.43.1-.99-.33-1.24l-6.46-3.72a.9.9 0 00-1.23.33v0c-.25.43-.1.99.33 1.24l6.45 3.72c.43.25.99.1 1.24-.33z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1606)">
            <path
              fill="#b4c7e7"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M865.71 123.56c.25.44.82.59 1.26.34l2.81-1.63c.44-.25.59-.82.34-1.26a.94.94 0 00-1.27-.34l-2.8 1.62c-.45.26-.6.83-.34 1.27z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1616)">
            <path
              fill="none"
              stroke="#2f528f"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.5"
              d="M865.71 123.56c.25.44.82.59 1.26.34l2.81-1.63c.44-.25.59-.82.34-1.26v0a.94.94 0 00-1.27-.34l-2.8 1.62c-.45.26-.6.83-.34 1.27z"
            />
          </g>
        </g>
        <g>
          <path
            fill="url(#linearGradient1636)"
            fillOpacity="1"
            fillRule="evenodd"
            stroke="none"
            d="M179.59 238.02h90.58c11.87 0 21.49-27.1 21.49-60.54s-9.62-60.54-21.49-60.54h-90.58c-11.87 0-21.49 27.1-21.49 60.54s9.62 60.54 21.49 60.54z"
          />
        </g>
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M179.59 238.02h90.58c11.87 0 21.49-27.1 21.49-60.54s-9.62-60.54-21.49-60.54h-90.58c-11.87 0-21.49 27.1-21.49 60.54s9.62 60.54 21.49 60.54z"
        />
        {apiValues?.[keys?.[1.6]] && apiValues?.[keys?.[1.6]] >= 1 && (
          <>
            <path
              fill="none"
              stroke="red"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="2.04"
              d="M187.14 127.26h15.63"
            />
            <path
              fill="#fbe5d6"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M202.68 121.08h48.24v12.6h-48.24z"
            />
            <path
              fill="none"
              stroke="red"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.96"
              d="M202.68 121.08h48.24v12.6h-48.24z"
            />
            <g>
              <g clipPath="url(#clipPath1654)">
                <text
                  fill="red"
                  fillOpacity="1"
                  fillRule="nonzero"
                  stroke="none"
                  fontFamily="Calibri"
                  fontSize="9.024"
                  fontVariant="normal"
                  fontWeight="normal"
                  transform="matrix(1 0 0 -1 221.11 124.3)"
                  writingMode="lr-tb"
                >
                  <tspan x="0 4.5751681 6.849216" y="0">
                    !! Emptry !!
                  </tspan>
                </text>
              </g>
            </g>
          </>
        )}
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M228.72 172.92h48.24v12.6h-48.24z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M228.72 172.92h48.24v12.6h-48.24z"
        />
        <g>
          <g clipPath="url(#clipPath1670)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 240.18 176.14)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[1.4]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[1.4]])} °C`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#767171"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M201.48 207.24l-5.82-6.84-5.82 6.84z"
        />
        <path
          fill="none"
          stroke="#767171"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M201.48 207.24l-5.82-6.84-5.82 6.84z"
        />
        <path
          fill="none"
          stroke="#767171"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M195.72 200.4v-72.1"
        />
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M172.56 207.72h48.12v12.48h-48.12z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M172.56 207.72h48.12v12.48h-48.12z"
        />
        <g>
          <g clipPath="url(#clipPath1692)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 185.9 210.89)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[1.5]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[1.5]])} cm`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M162.72 239.76l4.98 7.08 4.98-7.08z"
        />
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M162.72 239.76l4.98 7.08 4.98-7.08z"
        />
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M172.68 254.4l-4.98-7.08-4.98 7.08z"
        />
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M172.68 254.4l-4.98-7.08-4.98 7.08z"
        />
        <g>
          <g clipPath="url(#clipPath1712)">
            <path
              fill="none"
              stroke="#000"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.48"
              d="M167.76 239.76v-9.56"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1722)">
            <path
              fill="none"
              stroke="#000"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.48"
              d="M167.76 263.88v-9.56"
            />
          </g>
        </g>
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M167.6 263.76h-9.56"
        />
        <path
          fill="none"
          stroke="#4472c4"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M128.63 375.18l-.65-246.01"
        />
        <path
          fill="none"
          stroke="#767171"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M117.84 168.35l9.52.13"
        />
        <g>
          <g clipPath="url(#clipPath1738)">
            <path
              fill="#767171"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              d="M112.08 162.6l6.84 5.82-6.84 5.82z"
            />
          </g>
        </g>
        <g>
          <g clipPath="url(#clipPath1748)">
            <path
              fill="none"
              stroke="#767171"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="0.96"
              d="M112.08 162.6l6.84 5.82-6.84 5.82z"
            />
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M104.28 180h48.24v12.48h-48.24z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M104.28 180h48.24v12.48h-48.24z"
        />
        <g>
          <g clipPath="url(#clipPath1762)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 118.25 183.14)"
              writingMode="lr-tb"
            >
              <tspan x="0 4.5630002 6.48 11.16 15.813" y="0">
                0 hPa
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M121.56 134.04l6.06 10.2 6.06-10.2z"
        />
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M121.56 134.04l6.06 10.2 6.06-10.2z"
        />
        <g>
          <g clipPath="url(#clipPath1778)">
            <path
              fill="none"
              stroke="#000"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeOpacity="1"
              strokeWidth="2.28"
              d="M120.9 144.06h13.07"
            />
          </g>
        </g>
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M103.92 113.16h48.12v12.48h-48.12z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M103.92 113.16h48.12v12.48h-48.12z"
        />
        <g>
          <g clipPath="url(#clipPath1792)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 118.1 116.28)"
              writingMode="lr-tb"
            >
              <tspan x="0 4.5630002 6.8309999 11.394 13.203" y="0">
                0.0 %
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M571.08 112.6v8.24"
        />
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M565.32 99.36h48.24v12.48h-48.24z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M565.32 99.36h48.24v12.48h-48.24z"
        />
        <g>
          <g clipPath="url(#clipPath1810)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 579.8 102.53)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {/* 4.6 */}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="none"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.48"
          d="M571.2 178.96v8.24"
        />
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M565.44 187.2h48.24v12.6h-48.24z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M565.44 187.2h48.24v12.6h-48.24z"
        />
        <g>
          <g clipPath="url(#clipPath1828)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 579.94 190.46)"
              writingMode="lr-tb"
            >
              <tspan x="0" y="0">
                {apiValues?.[keys?.[4.7]] &&
                  `${roundToOneDecimalPlace(apiValues?.[keys?.[4.7]])} °C`}
              </tspan>
            </text>
          </g>
        </g>
        <path
          fill="none"
          stroke="#ffc000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M644.1 304.98h193.63"
        />
        <path
          fill="none"
          stroke="#ffc000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="2.28"
          d="M833.46 299.25l9.39 10.89"
        />
        <path
          fill="#ffe699"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M865.83 314.52l-13.35-19.51 13.35 2.87-5.43-10.96-2.6 1.32-.11-8.16 8.25 5.6-2.93.46 11.07 16.02-14-3.11 14 14.07z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M865.83 314.52l-13.35-19.51 13.35 2.87-5.43-10.96-2.6 1.32-.11-8.16 8.25 5.6-2.93.46 11.07 16.02-14-3.11 14 14.07z"
        />
        <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M430.08 155.52h48.24V168h-48.24z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M430.08 155.52h48.24V168h-48.24z"
        />
        <g>
          <g clipPath="url(#clipPath1852)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 448.56 158.69)"
              writingMode="lr-tb"
            >
              <tspan x="0 4.5630002 6.8309999" y="0">
                {/* 3.5 */}
              </tspan>
            </text>
          </g>
        </g>
        {/* <path
          fill="#fff"
          fillOpacity="1"
          fillRule="evenodd"
          stroke="none"
          d="M128.64 263.76h34.08v10.56h-34.08z"
        />
        <path
          fill="none"
          stroke="#2f528f"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeOpacity="1"
          strokeWidth="0.96"
          d="M128.64 263.76h34.08v10.56h-34.08z"
        />
        <g>
          <g clipPath="url(#clipPath1868)">
            <text
              fill="#203864"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              fontFamily="Calibri"
              fontSize="9"
              fontVariant="normal"
              fontWeight="normal"
              transform="matrix(1 0 0 -1 137.69 265.99)"
              writingMode="lr-tb"
            >
              <tspan x="0 4.5630002 6.8309999 11.394" y="0">
                4.10
              </tspan>
            </text>
          </g>
        </g> */}
      </g>
    </svg>
  );
};
