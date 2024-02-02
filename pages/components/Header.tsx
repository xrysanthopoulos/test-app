import React from 'react'

const headerStyles: React.CSSProperties = {
  fontSize: '11px',
  textTransform: 'uppercase',
  textAlign: 'center',
  fontWeight: 'bold',
};

const countyStyles: React.CSSProperties = {
  fontSize: '4rem',
};

const Header: React.FC = () => {
  return (
    <div id='header' style={headerStyles}>
      <Breadcrumbs />
      <div style={{ margin: '40px' }}>
        <p lang='el' style={countyStyles}>
          Ελλάδα
        </p>
        <div>Πακέτα - Προσφορές</div>
      </div>
    </div>
  );
};

export default Header

const Breadcrumbs = () => {
    const breadcrumbStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const separatorStyle = {
      margin: '0 5px',
      color: "#009649",
    };
  
    return (
      <div style={breadcrumbStyle}>
        <p style={{ margin: '0' }}>Αρχική</p>
        <span style={separatorStyle}>&#10093;</span>
        <p style={{ margin: '0' }}>Ελλάδα</p>
        <span style={separatorStyle}>&#10093;</span>
        <p style={{ margin: '0' }}>Πακέτα</p>
      </div>
    );
  };