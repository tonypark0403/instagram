import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const ReactHelmet = ({ keywords, description, title, favicon }) => {
  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:image" content={favicon} />
      <meta property="og:site_name" content="" />
      <meta property="og:description" content={description} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={favicon} />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
};

ReactHelmet.propTypes = {
  keywords: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  favicon: PropTypes.string,
};

export default ReactHelmet;
