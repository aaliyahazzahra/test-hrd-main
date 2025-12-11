
const PALETTE = {
    // Warna Utama (Pink)
    PRIMARY: '#FFB0CD',    
    
    // Warna Sekunder (Peach)
    SECONDARY_LIGHT: '#FFD1BD', 
    
    // Warna Info (Light Blue)
    INFO: '#C2F0FC',       
    
    // Warna Latar Belakang Utama 
    BACKGROUND: '#FFFAFA',
};

const FUNCTIONAL = {
    // Teks & Netral
    TEXT_DARK: '#411f33ff',    
    TEXT_MUTED: '#6c757d',   
    TEXT_LIGHT: '#F8F8F8',   
    
    // Status (Dibutuhkan untuk Status Karyawan & Tombol Aksi)
    SUCCESS: '#A8E6CF',     
    SUCCESS_DARK: '#1d5c42ff', 
    WARNING: '#FFD3B5',      
    DANGER: '#FF8B94',  
    DANGER_DARK: '#A30015', 
    
    // Utility
    LIGHT_GREY: '#F0F0F0',   
};


const COLORS = {
    // 1. Branding & Main Actions
    primary: PALETTE.PRIMARY,
    
    // 2. Secondary & Utility
    secondary: FUNCTIONAL.TEXT_MUTED,  
    info: PALETTE.INFO,
    
    // 3. Backgrounds
    bgPrimary: PALETTE.BACKGROUND,     
    bgLight: FUNCTIONAL.LIGHT_GREY,    
    bgSecondaryLight: PALETTE.SECONDARY_LIGHT, 
    
    // 4. Text
    textPrimary: FUNCTIONAL.TEXT_DARK,
    textSecondary: FUNCTIONAL.TEXT_MUTED,
    textLight: FUNCTIONAL.TEXT_LIGHT,
    
    // 5. Status
    status: {
        success: FUNCTIONAL.SUCCESS,
        successText: FUNCTIONAL.SUCCESS_DARK,
        warning: FUNCTIONAL.WARNING,
        danger: FUNCTIONAL.DANGER,
        dangerText: FUNCTIONAL.DANGER_DARK,
    }
};

export default COLORS;