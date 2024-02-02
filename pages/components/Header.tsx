import React from 'react'

const Header = () => {

    const header = {
        color: "#333",
        fontFamily: "Arial",
        textAlign: 'center',
      };

    const county = {
        fontSize: "60px",
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: '600',
      };

  return (
    <div id='header' style={header}>
        <Breadcrumbs/>
            <div style={{margin: '40px'}}>
                <p lang='el' style={county} >Ελλάδα</p>
                <div>Πακέτα - Προσφορές</div>
            </div>
    </div>
  )
}

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
        <span style={separatorStyle}>></span>
        <p style={{ margin: '0' }}>Ελλάδα</p>
        <span style={separatorStyle}>></span>
        <p style={{ margin: '0' }}>Πακέτα</p>
      </div>
    );
  };