import jsPDF from 'jspdf';

// Helper function to format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price || 0);
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Helper function to convert image to base64
const imageToBase64 = async (imageUrl) => {
  try {
    if (imageUrl.startsWith('data:image')) {
      return imageUrl;
    }
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

// Get company initials for logo fallback
const getCompanyInitials = (companyName) => {
  if (!companyName) return 'AC';
  return companyName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Function to draw a color circle
const drawColorCircle = (doc, x, y, radius, colorCode) => {
  doc.setFillColor(colorCode);
  doc.circle(x, y, radius, 'F');
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.1);
  doc.circle(x, y, radius, 'S');
};

export const generateInvoicePDF = async (invoice) => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (2 * margin);
    let yPos = margin;

    // Load company logo
    let companyLogoBase64 = null;
    if (invoice.company?.logo) {
      try {
        companyLogoBase64 = await imageToBase64(invoice.company.logo);
      } catch (error) {
        console.error('Failed to load company logo:', error);
      }
    }

    // ==================== HEADER ====================
    doc.setFillColor(227, 154, 101);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, yPos, contentWidth, 28, 2, 2, 'F');

    // Logo
    const logoSize = 18;
    const logoX = margin + 5;
    const logoY = yPos + 5;
    
    if (companyLogoBase64) {
      try {
        doc.addImage(companyLogoBase64, 'PNG', logoX, logoY, logoSize, logoSize);
      } catch (error) {
        const companyName = invoice.company?.companyName || 'Asian Clothify';
        const initials = getCompanyInitials(companyName);
        doc.setFillColor(227, 154, 101);
        doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
      }
    } else {
      const companyName = invoice.company?.companyName || 'Asian Clothify';
      const initials = getCompanyInitials(companyName);
      doc.setFillColor(227, 154, 101);
      doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
    }

    // Company Info - Now with Contact Person, Email|Phone, Address
    const companyX = logoX + logoSize + 10;
    
    // Company Name
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(invoice.company?.companyName || 'Asian Clothify', companyX, logoY + 6);

  // Contact Person with "Contact:" label
doc.setFontSize(8);
doc.setFont('helvetica', 'normal');
doc.setTextColor(80, 80, 80);
if (invoice.company?.contactPerson) {
  // Add "Contact:" label in bold
  doc.setFont('helvetica', 'bold');
  doc.text('Contact: ', companyX, logoY + 11);
  
  // Get width of "Contact: " text
  const contactLabelWidth = doc.getTextWidth('Contact: ');
  
  // Add the actual contact name in normal font after the label
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.company.contactPerson, companyX + contactLabelWidth, logoY + 11);
} else {
  // If no contact person, just show "Contact: N/A"
  doc.setFont('helvetica', 'bold');
  doc.text('Contact: ', companyX, logoY + 11);
  doc.setFont('helvetica', 'normal');
  doc.text('N/A', companyX + doc.getTextWidth('Contact: '), logoY + 11);
}

    // Email | Phone
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    const emailPhone = `${invoice.company?.email || 'info@asianclothify.com'} | ${invoice.company?.phone || '+8801305-785685'}`;
    doc.text(emailPhone, companyX, logoY + 15);

    // Address
    if (invoice.company?.address) {
      doc.setFontSize(6.5);
      const addressLines = doc.splitTextToSize(invoice.company.address, 80);
      doc.text(addressLines, companyX, logoY + 19);
    }

    // Invoice Number
    const rightAlignX = pageWidth - margin - 5;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(227, 154, 101);
    doc.text('INVOICE NO:', rightAlignX, yPos + 8, { align: 'right' });
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    let invoiceNumber = invoice.invoiceNumber || '';
    if (invoiceNumber.length > 18) {
      invoiceNumber = invoiceNumber.substring(0, 15) + '...';
    }
    doc.text(invoiceNumber, rightAlignX, yPos + 16, { align: 'right' });

    // ==================== BILL TO & DETAILS (WITH SHIPPING ADDRESS) ====================
    yPos += 35;

    // Calculate dynamic height for Bill To section
    let billToHeight = 20; // Base height for company, contact, email, phone
    
    const billingAddress = [
      invoice.customer?.billingAddress,
      invoice.customer?.billingCity,
      invoice.customer?.billingZipCode,
      invoice.customer?.billingCountry
    ].filter(Boolean).join(', ');
    
    if (billingAddress) {
      billToHeight += 8; // Space for "Bill To:" label
      const billingLines = doc.splitTextToSize(billingAddress, (contentWidth * 0.6) - 10);
      billToHeight += billingLines.length * 3.5;
    }

    const shippingAddress = [
      invoice.customer?.shippingAddress,
      invoice.customer?.shippingCity,
      invoice.customer?.shippingZipCode,
      invoice.customer?.shippingCountry
    ].filter(Boolean).join(', ');
    
    if (shippingAddress) {
      billToHeight += 8; // Space for "Ship To:" label
      const shippingLines = doc.splitTextToSize(shippingAddress, (contentWidth * 0.6) - 10);
      billToHeight += shippingLines.length * 3.5;
    }

    // Bill To Section - Dynamic height
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(margin, yPos, contentWidth * 0.6 - 3, billToHeight, 2, 2, 'F');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('BILL TO', margin + 5, yPos + 6);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    
    let customerY = yPos + 11;
    
    // Customer Company Name
    doc.setFont('helvetica', 'bold');
    doc.text(invoice.customer?.companyName || 'N/A', margin + 5, customerY);
    customerY += 4.5;
    
    // Contact Person
    doc.setFont('helvetica', 'normal');
    if (invoice.customer?.contactPerson) {
      doc.text(invoice.customer.contactPerson, margin + 5, customerY);
      customerY += 4.5;
    }
    
    // Email
    if (invoice.customer?.email) {
      doc.text(invoice.customer.email, margin + 5, customerY);
      customerY += 4.5;
    }
    
    // Phone
    if (invoice.customer?.phone) {
      doc.text(invoice.customer.phone, margin + 5, customerY);
      customerY += 4.5;
    }

    // Billing Address
 // Billing Address
if (billingAddress) {
  doc.setFont('helvetica', 'bold');
  const billToText = `Bill To: `;
  doc.text(billToText, margin + 5, customerY);
  
  // Calculate width of "Bill To: " text
  const billToWidth = doc.getTextWidth(billToText);
  
  doc.setFont('helvetica', 'normal');
  const billingLines = doc.splitTextToSize(billingAddress, (contentWidth * 0.6) - 10 - billToWidth);
  
  // First line of address goes right after "Bill To: "
  doc.text(billingLines[0], margin + 5 + billToWidth, customerY);
  
  // Remaining lines (if any) go on new lines with indent
  for (let i = 1; i < billingLines.length; i++) {
    doc.text(billingLines[i], margin + 5, customerY + (i * 3.5));
  }
  
  customerY += (billingLines.length * 3.5) + 2;
}

// Shipping Address
if (shippingAddress) {
  doc.setFont('helvetica', 'bold');
  const shipToText = `Ship To: `;
  doc.text(shipToText, margin + 5, customerY);
  
  // Calculate width of "Ship To: " text
  const shipToWidth = doc.getTextWidth(shipToText);
  
  doc.setFont('helvetica', 'normal');
  const shippingLines = doc.splitTextToSize(shippingAddress, (contentWidth * 0.6) - 10 - shipToWidth);
  
  // First line of address goes right after "Ship To: "
  doc.text(shippingLines[0], margin + 5 + shipToWidth, customerY);
  
  // Remaining lines (if any) go on new lines with indent
  for (let i = 1; i < shippingLines.length; i++) {
    doc.text(shippingLines[i], margin + 5, customerY + (i * 3.5));
  }
}
    // Invoice Details - Fixed height
    const detailsHeight = 35;
    const detailsX = margin + contentWidth * 0.6 + 3;
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(detailsX, yPos, contentWidth * 0.4 - 3, detailsHeight, 2, 2, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('DETAILS', detailsX + 5, yPos + 6);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');

    const details = [
      `Date: ${formatDate(invoice.invoiceDate)}`,
      `Due: ${formatDate(invoice.dueDate)}`,
      `Status: ${invoice.paymentStatus?.toUpperCase() || 'UNPAID'}`,
      `Ref: ${invoice.inquiryNumber || 'N/A'}`
    ];

    details.forEach((detail, index) => {
      doc.text(detail, detailsX + 5, yPos + 11 + (index * 4.5));
    });

    // Move yPos past the taller of the two sections
    yPos += Math.max(billToHeight, detailsHeight) + 8;

    // ==================== ITEMS TABLE ====================
    // Table Header
    doc.setFillColor(227, 154, 101);
    doc.rect(margin, yPos, contentWidth, 8, 'F');

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);

    const colPositions = {
      item: margin + 3,
      product: margin + 12,
      color: margin + 55,
      sizes: margin + 75,
      qty: margin + contentWidth - 42,
      price: margin + contentWidth - 27,
      total: margin + contentWidth - 10
    };

    doc.text('#', colPositions.item, yPos + 5);
    doc.text('Product', colPositions.product, yPos + 5);
    doc.text('Color', colPositions.color, yPos + 5);
    doc.text('Sizes', colPositions.sizes, yPos + 5);
    doc.text('Qty', colPositions.qty, yPos + 5, { align: 'right' });
    doc.text('Price', colPositions.price, yPos + 5, { align: 'right' });
    doc.text('Total', colPositions.total, yPos + 5, { align: 'right' });

    yPos += 12;

    let rowsUsed = 0;
    let itemNumber = 1;
    
    if (invoice.items && invoice.items.length > 0) {
      for (const item of invoice.items) {
        let firstColor = true;
        
        if (item.colors && item.colors.length > 0) {
          for (const color of item.colors) {
            const activeSizes = color.sizeQuantities?.filter(sq => sq.quantity > 0) || [];
            
           const rowHeight = 4;
            if (yPos + rowHeight > pageHeight - 70) {
              doc.addPage();
              yPos = margin + 10;
              
              doc.setFillColor(227, 154, 101);
              doc.rect(margin, yPos, contentWidth, 8, 'F');
              doc.setFontSize(7.5);
              doc.setFont('helvetica', 'bold');
              doc.setTextColor(255, 255, 255);
              doc.text('#', colPositions.item, yPos + 5);
              doc.text('Product', colPositions.product, yPos + 5);
              doc.text('Color', colPositions.color, yPos + 5);
              doc.text('Sizes', colPositions.sizes, yPos + 5);
              doc.text('Qty', colPositions.qty, yPos + 5, { align: 'right' });
              doc.text('Price', colPositions.price, yPos + 5, { align: 'right' });
              doc.text('Total', colPositions.total, yPos + 5, { align: 'right' });
              yPos += 12;
            }

            if (rowsUsed % 2 === 0) {
              doc.setFillColor(250, 250, 250);
              doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
            }

            doc.setFontSize(6.5);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(60, 60, 60);

            if (firstColor) {
              doc.text(itemNumber.toString(), colPositions.item, yPos);
            }

            if (firstColor) {
              const productName = item.productName || '';
              const shortName = productName.length > 20 ? productName.substring(0, 17) + '...' : productName;
              doc.text(shortName, colPositions.product, yPos);
            }

            const colorCode = color.color?.code || '#CCCCCC';
            drawColorCircle(doc, colPositions.color + 2, yPos - 1, 1.5, colorCode);

            // Sizes - Show all sizes on the same line
if (activeSizes.length > 0) {
  // Create a single string with all sizes
  const sizesText = activeSizes.map(sq => `${sq.size}:${sq.quantity}`).join(' ');
  doc.text(sizesText, colPositions.sizes, yPos);
} else {
  doc.text('-', colPositions.sizes, yPos);
}

            const colorQty = color.totalForColor || 
              color.sizeQuantities?.reduce((sum, sq) => sum + (sq.quantity || 0), 0) || 0;
            
            const qtyYPos = yPos;
            doc.text(colorQty.toString(), colPositions.qty, qtyYPos, { align: 'right' });

            if (firstColor) {
              doc.text(formatPrice(item.unitPrice || 0), colPositions.price, qtyYPos, { align: 'right' });
            }

            const colorTotal = colorQty * (item.unitPrice || 0);
            doc.setFont('helvetica', 'bold');
            doc.text(formatPrice(colorTotal), colPositions.total, qtyYPos, { align: 'right' });

            yPos += rowHeight;
            rowsUsed++;
            firstColor = false;
          }
        } else {
          if (yPos + 4 > pageHeight - 70) {
            doc.addPage();
            yPos = margin + 10;
            
            doc.setFillColor(227, 154, 101);
            doc.rect(margin, yPos, contentWidth, 8, 'F');
            doc.setFontSize(7.5);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text('#', colPositions.item, yPos + 5);
            doc.text('Product', colPositions.product, yPos + 5);
            doc.text('Color', colPositions.color, yPos + 5);
            doc.text('Sizes', colPositions.sizes, yPos + 5);
            doc.text('Qty', colPositions.qty, yPos + 5, { align: 'right' });
            doc.text('Price', colPositions.price, yPos + 5, { align: 'right' });
            doc.text('Total', colPositions.total, yPos + 5, { align: 'right' });
            yPos += 12;
          }

          if (rowsUsed % 2 === 0) {
            doc.setFillColor(250, 250, 250);
            doc.rect(margin, yPos - 2, contentWidth, 4, 'F');
          }

          doc.setFontSize(6.5);
          doc.setFont('helvetica', 'normal');
          
          doc.text(itemNumber.toString(), colPositions.item, yPos);
          
          const productName = item.productName || '';
          const shortName = productName.length > 20 ? productName.substring(0, 17) + '...' : productName;
          doc.text(shortName, colPositions.product, yPos);
          
          drawColorCircle(doc, colPositions.color + 2, yPos - 1, 1.5, '#CCCCCC');
          doc.text('-', colPositions.sizes, yPos);
          
          const totalQty = item.totalQuantity || 0;
          doc.text(totalQty.toString(), colPositions.qty, yPos, { align: 'right' });
          doc.text(formatPrice(item.unitPrice || 0), colPositions.price, yPos, { align: 'right' });
          
          doc.setFont('helvetica', 'bold');
          doc.text(formatPrice(item.total || 0), colPositions.total, yPos, { align: 'right' });

          yPos += 4;
          rowsUsed++;
        }
        itemNumber++;
      }
    }

    yPos += 8;

    // ==================== BANK DETAILS & SUMMARY (2 COLUMN LAYOUT) ====================
    if (yPos > pageHeight - 80) {
      doc.addPage();
      yPos = margin + 10;
    }

    // LEFT COLUMN - BANK DETAILS
    const leftColX = margin;
    const rightColX = pageWidth - margin - 85;
    const colWidth = 85;

    if (invoice.bankDetails && Object.values(invoice.bankDetails).some(v => v)) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('BANK DETAILS', leftColX, yPos);

      doc.setFontSize(6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);

      const bankLines = [];
      if (invoice.bankDetails.bankName) bankLines.push(`Bank: ${invoice.bankDetails.bankName}`);
      if (invoice.bankDetails.accountName) bankLines.push(`Account Name: ${invoice.bankDetails.accountName}`);
      if (invoice.bankDetails.accountNumber) bankLines.push(`Account No: ${invoice.bankDetails.accountNumber}`);
      if (invoice.bankDetails.accountType) bankLines.push(`Account Type: ${invoice.bankDetails.accountType}`);
      if (invoice.bankDetails.routingNumber) bankLines.push(`Routing No: ${invoice.bankDetails.routingNumber}`);
      if (invoice.bankDetails.swiftCode) bankLines.push(`SWIFT: ${invoice.bankDetails.swiftCode}`);
      if (invoice.bankDetails.iban) bankLines.push(`IBAN: ${invoice.bankDetails.iban}`);
      if (invoice.bankDetails.bankAddress) {
        const addressLines = doc.splitTextToSize(`Address: ${invoice.bankDetails.bankAddress}`, colWidth - 5);
        bankLines.push(...addressLines);
      }

      // Show all bank lines
      bankLines.forEach((line, index) => {
        doc.text(line, leftColX, yPos + 4 + (index * 3));
      });

      const bankLinesCount = bankLines.length;
      
      // RIGHT COLUMN - SUMMARY
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(rightColX, yPos, colWidth, 42, 2, 2, 'F');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('SUMMARY', rightColX + 3, yPos + 5);

      let summaryY = yPos + 9;
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');

      const subtotal = invoice.subtotal || 0;
      const vatPercentage = invoice.vatPercentage || 0;
      const vatAmount = invoice.vatAmount || 0;
      const discountPercentage = invoice.discountPercentage || 0;
      const discountAmount = invoice.discountAmount || 0;
      const shippingCost = invoice.shippingCost || 0;
      const finalTotal = invoice.finalTotal || 0;
      const amountPaid = invoice.amountPaid || 0;
      const dueAmount = invoice.dueAmount || 0;

      doc.text('Subtotal:', rightColX + 3, summaryY);
      doc.text(formatPrice(subtotal), rightColX + colWidth - 3, summaryY, { align: 'right' });
      summaryY += 4;

      if (vatPercentage > 0) {
        doc.text(`VAT ${vatPercentage}%:`, rightColX + 3, summaryY);
        doc.text(formatPrice(vatAmount), rightColX + colWidth - 3, summaryY, { align: 'right' });
        summaryY += 4;
      }

      if (discountPercentage > 0) {
        doc.text(`Disc ${discountPercentage}%:`, rightColX + 3, summaryY);
        doc.text(`-${formatPrice(discountAmount)}`, rightColX + colWidth - 3, summaryY, { align: 'right' });
        summaryY += 4;
      }

      if (shippingCost > 0) {
        doc.text('Shipping:', rightColX + 3, summaryY);
        doc.text(formatPrice(shippingCost), rightColX + colWidth - 3, summaryY, { align: 'right' });
        summaryY += 4;
      }

      doc.setDrawColor(200, 200, 200);
      doc.line(rightColX + 3, summaryY - 1, rightColX + colWidth - 3, summaryY - 1);
      
      summaryY += 2;
      
      doc.setFont('helvetica', 'bold');
      doc.text('TOTAL:', rightColX + 3, summaryY);
      doc.text(formatPrice(finalTotal), rightColX + colWidth - 3, summaryY, { align: 'right' });

      const paymentY = summaryY + 5;
      
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      
      doc.setTextColor(34, 197, 94);
      doc.text(`Paid: ${formatPrice(amountPaid)}`, rightColX + 3, paymentY);
      doc.text(`${finalTotal > 0 ? ((amountPaid / finalTotal) * 100).toFixed(1) : '0'}%`, rightColX + colWidth - 3, paymentY, { align: 'right' });
      
      doc.setTextColor(dueAmount > 0 ? 239 : 34, dueAmount > 0 ? 68 : 197, dueAmount > 0 ? 68 : 94);
      doc.text(`Due: ${formatPrice(dueAmount)}`, rightColX + 3, paymentY + 4);
      doc.text(`${finalTotal > 0 ? ((dueAmount / finalTotal) * 100).toFixed(1) : '0'}%`, rightColX + colWidth - 3, paymentY + 4, { align: 'right' });

      yPos += Math.max(bankLinesCount * 3 + 10, 50) + 5;
    } else {
      // If no bank details, only show summary
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(rightColX, yPos, colWidth, 42, 2, 2, 'F');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('SUMMARY', rightColX + 3, yPos + 5);

      let summaryY = yPos + 9;
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');

      const subtotal = invoice.subtotal || 0;
      const vatPercentage = invoice.vatPercentage || 0;
      const vatAmount = invoice.vatAmount || 0;
      const discountPercentage = invoice.discountPercentage || 0;
      const discountAmount = invoice.discountAmount || 0;
      const shippingCost = invoice.shippingCost || 0;
      const finalTotal = invoice.finalTotal || 0;
      const amountPaid = invoice.amountPaid || 0;
      const dueAmount = invoice.dueAmount || 0;

      doc.text('Subtotal:', rightColX + 3, summaryY);
      doc.text(formatPrice(subtotal), rightColX + colWidth - 3, summaryY, { align: 'right' });
      summaryY += 4;

      if (vatPercentage > 0) {
        doc.text(`VAT ${vatPercentage}%:`, rightColX + 3, summaryY);
        doc.text(formatPrice(vatAmount), rightColX + colWidth - 3, summaryY, { align: 'right' });
        summaryY += 4;
      }

      if (discountPercentage > 0) {
        doc.text(`Disc ${discountPercentage}%:`, rightColX + 3, summaryY);
        doc.text(`-${formatPrice(discountAmount)}`, rightColX + colWidth - 3, summaryY, { align: 'right' });
        summaryY += 4;
      }

      if (shippingCost > 0) {
        doc.text('Shipping:', rightColX + 3, summaryY);
        doc.text(formatPrice(shippingCost), rightColX + colWidth - 3, summaryY, { align: 'right' });
        summaryY += 4;
      }

      doc.setDrawColor(200, 200, 200);
      doc.line(rightColX + 3, summaryY - 1, rightColX + colWidth - 3, summaryY - 1);
      
      summaryY += 2;
      
      doc.setFont('helvetica', 'bold');
      doc.text('TOTAL:', rightColX + 3, summaryY);
      doc.text(formatPrice(finalTotal), rightColX + colWidth - 3, summaryY, { align: 'right' });

      const paymentY = summaryY + 5;
      
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      
      doc.setTextColor(34, 197, 94);
      doc.text(`Paid: ${formatPrice(amountPaid)}`, rightColX + 3, paymentY);
      doc.text(`${finalTotal > 0 ? ((amountPaid / finalTotal) * 100).toFixed(1) : '0'}%`, rightColX + colWidth - 3, paymentY, { align: 'right' });
      
      doc.setTextColor(dueAmount > 0 ? 239 : 34, dueAmount > 0 ? 68 : 197, dueAmount > 0 ? 68 : 94);
      doc.text(`Due: ${formatPrice(dueAmount)}`, rightColX + 3, paymentY + 4);
      doc.text(`${finalTotal > 0 ? ((dueAmount / finalTotal) * 100).toFixed(1) : '0'}%`, rightColX + colWidth - 3, paymentY + 4, { align: 'right' });

      yPos += 50;
    }

    // ==================== NOTES & TERMS ====================
    if (invoice.notes || invoice.terms) {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = margin + 10;
      }

      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 6;

      if (invoice.notes) {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('NOTES:', margin, yPos);
        
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        
        const noteLines = doc.splitTextToSize(invoice.notes, contentWidth);
        doc.text(noteLines, margin, yPos + 4);
        yPos += (noteLines.length * 4) + 5;
      }

      if (invoice.terms) {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('TERMS & CONDITIONS:', margin, yPos);
        
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        
        const termsLines = doc.splitTextToSize(invoice.terms, contentWidth);
        doc.text(termsLines, margin, yPos + 4);
      }
    }

    // ==================== FOOTER ====================
    const footerY = pageHeight - 5;
    
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);
    
    doc.setFontSize(5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).replace(/,/g, '');
    
    doc.text(`Invoice #${invoice.invoiceNumber} | Generated ${dateString}`, margin, footerY);
    doc.text(invoice.company?.companyName || 'Asian Clothify', pageWidth - margin, footerY, { align: 'right' });

    // Save PDF
    const fileName = `Invoice_${invoice.invoiceNumber}.pdf`;
    doc.save(fileName);
    
    return { success: true, fileName };
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
};