

// import jsPDF from 'jspdf';

// // Helper function to format currency
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2
//   }).format(price || 0);
// };

// // Helper function to format date
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });
// };

// // Helper function to convert image to base64
// const imageToBase64 = async (imageUrl) => {
//   try {
//     if (imageUrl.startsWith('data:image')) {
//       return imageUrl;
//     }
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error('Error converting image to base64:', error);
//     return null;
//   }
// };

// // Get company initials for logo fallback
// const getCompanyInitials = (companyName) => {
//   if (!companyName) return 'AC';
//   return companyName
//     .split(' ')
//     .map(word => word[0])
//     .join('')
//     .toUpperCase()
//     .substring(0, 2);
// };

// // Function to draw a color circle
// const drawColorCircle = (doc, x, y, radius, colorCode) => {
//   doc.setFillColor(colorCode);
//   doc.circle(x, y, radius, 'F');
//   doc.setDrawColor(100, 100, 100);
//   doc.setLineWidth(0.1);
//   doc.circle(x, y, radius, 'S');
// };

// export const generateInvoicePDF = async (invoice) => {
//   try {
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const margin = 15;
//     const contentWidth = pageWidth - (2 * margin);
//     let yPos = margin;

//     // Load company logo
//     let companyLogoBase64 = null;
//     if (invoice.company?.logo) {
//       try {
//         companyLogoBase64 = await imageToBase64(invoice.company.logo);
//       } catch (error) {
//         console.error('Failed to load company logo:', error);
//       }
//     }

//     // ==================== HEADER ====================
//     doc.setFillColor(227, 154, 101);
//     doc.rect(0, 0, pageWidth, 32, 'F');
    
//     doc.setFillColor(255, 255, 255);
//     doc.roundedRect(margin, yPos, contentWidth, 26, 2, 2, 'F');

//     // Logo
//     const logoSize = 16;
//     const logoX = margin + 5;
//     const logoY = yPos + 5;
    
//     if (companyLogoBase64) {
//       try {
//         doc.addImage(companyLogoBase64, 'PNG', logoX, logoY, logoSize, logoSize);
//       } catch (error) {
//         const companyName = invoice.company?.companyName || 'Asian Clothify';
//         const initials = getCompanyInitials(companyName);
//         doc.setFillColor(227, 154, 101);
//         doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
//         doc.setFontSize(9);
//         doc.setFont('helvetica', 'bold');
//         doc.setTextColor(255, 255, 255);
//         doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
//       }
//     } else {
//       const companyName = invoice.company?.companyName || 'Asian Clothify';
//       const initials = getCompanyInitials(companyName);
//       doc.setFillColor(227, 154, 101);
//       doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
//       doc.setFontSize(9);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(255, 255, 255);
//       doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
//     }

//     // Company Info
//     const companyX = logoX + logoSize + 8;
    
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(0, 0, 0);
//     doc.text(invoice.company?.companyName || 'Asian Clothify', companyX, logoY + 5);

//     doc.setFontSize(7);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(80, 80, 80);
//     if (invoice.company?.contactPerson) {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Contact: ', companyX, logoY + 10);
//       const contactLabelWidth = doc.getTextWidth('Contact: ');
//       doc.setFont('helvetica', 'normal');
//       doc.text(invoice.company.contactPerson, companyX + contactLabelWidth, logoY + 10);
//     } else {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Contact: ', companyX, logoY + 10);
//       doc.setFont('helvetica', 'normal');
//       doc.text('N/A', companyX + doc.getTextWidth('Contact: '), logoY + 10);
//     }

//     doc.setFontSize(6.5);
//     const emailPhone = `${invoice.company?.email || 'info@asianclothify.com'} | ${invoice.company?.phone || '+8801305-785685'}`;
//     doc.text(emailPhone, companyX, logoY + 14);

//     if (invoice.company?.address) {
//       doc.setFontSize(6);
//       const addressLines = doc.splitTextToSize(invoice.company.address, 70);
//       doc.text(addressLines, companyX, logoY + 18);
//     }

//     // Invoice Number and Details
//     const rightAlignX = pageWidth - margin - 5;
    
//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(227, 154, 101);
//     const invoiceNoText = `INVOICE NO: `;
//     doc.text(invoiceNoText, rightAlignX - doc.getTextWidth(invoiceNoText + (invoice.invoiceNumber || '')), yPos + 8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(0, 0, 0);
//     doc.text(invoice.invoiceNumber || '', rightAlignX, yPos + 8, { align: 'right' });

//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(100, 100, 100);
    
//     const invoiceDate = formatDate(invoice.invoiceDate);
//     const dueDate = formatDate(invoice.dueDate);
//     const status = invoice.paymentStatus?.toUpperCase() || 'UNPAID';
//     const inquiryRef = invoice.inquiryNumber || 'N/A';
    
//     doc.text(`Date: ${invoiceDate}`, rightAlignX, yPos + 11.5, { align: 'right' });
//     doc.text(`Due: ${dueDate}`, rightAlignX, yPos + 15.5, { align: 'right' });
//     doc.text(`Status: ${status}`, rightAlignX, yPos + 19.5, { align: 'right' });
//     doc.text(`Ref: ${inquiryRef}`, rightAlignX, yPos + 23.5, { align: 'right' });

//     // ==================== CUSTOMER INFO SECTION ====================
//     yPos += 34;
    
//     const billingAddress = [
//       invoice.customer?.billingAddress,
//       invoice.customer?.billingCity,
//       invoice.customer?.billingZipCode,
//       invoice.customer?.billingCountry
//     ].filter(Boolean).join(', ');
    
//     const shippingAddress = [
//       invoice.customer?.shippingAddress,
//       invoice.customer?.shippingCity,
//       invoice.customer?.shippingZipCode,
//       invoice.customer?.shippingCountry
//     ].filter(Boolean).join(', ');
    
//     const addressesAreSame = billingAddress === shippingAddress && billingAddress !== '';

//     let leftColHeight = 20;
//     let rightColHeight = 20;
    
//     if (billingAddress) {
//       const billingLines = doc.splitTextToSize(billingAddress, (contentWidth / 2) - 10);
//       rightColHeight += 4 + (billingLines.length * 3.5);
//     }
    
//     if (!addressesAreSame && shippingAddress) {
//       const shippingLines = doc.splitTextToSize(shippingAddress, (contentWidth / 2) - 10);
//       rightColHeight += 4 + (shippingLines.length * 3.5);
//     } else if (addressesAreSame && billingAddress) {
//       rightColHeight += 4 + 3.5;
//     }
    
//     const colHeight = Math.max(leftColHeight, rightColHeight);
    
//     // Left Column - Customer Info
//     doc.setFillColor(245, 245, 245);
//     doc.roundedRect(margin, yPos, (contentWidth / 2) - 3, colHeight, 2, 2, 'F');
    
//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(0, 0, 0);
//     doc.text('CUSTOMER INFO', margin + 5, yPos + 5);
    
//     let leftY = yPos + 10;
//     doc.setFontSize(7);
//     doc.setFont('helvetica', 'bold');
//     doc.text(invoice.customer?.companyName || 'N/A', margin + 5, leftY);
//     leftY += 4.5;
    
//     doc.setFont('helvetica', 'normal');
//     if (invoice.customer?.contactPerson) {
//       doc.text(invoice.customer.contactPerson, margin + 5, leftY);
//       leftY += 4.5;
//     }
    
//     if (invoice.customer?.email) {
//       doc.text(invoice.customer.email, margin + 5, leftY);
//       leftY += 4.5;
//     }
    
//     if (invoice.customer?.phone) {
//       doc.text(invoice.customer.phone, margin + 5, leftY);
//     }
    
//     // Right Column - Address
//     const addressColX = margin + (contentWidth / 2) + 3;
//     doc.setFillColor(245, 245, 245);
//     doc.roundedRect(addressColX, yPos, (contentWidth / 2) - 3, colHeight, 2, 2, 'F');
    
//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.text('ADDRESS', addressColX + 5, yPos + 5);
    
//     let rightY = yPos + 10;
//     let lineSpacing = 3.5;
    
//     if (billingAddress) {
//       doc.setFontSize(6.5);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(80, 80, 80);
//       doc.text('Billing Address:', addressColX + 5, rightY);
//       rightY += lineSpacing;
//       doc.setFont('helvetica', 'normal');
//       const billingLines = doc.splitTextToSize(billingAddress, (contentWidth / 2) - 15);
//       for (let i = 0; i < billingLines.length; i++) {
//         doc.text(billingLines[i], addressColX + 5, rightY + (i * lineSpacing));
//       }
//       rightY += (billingLines.length * lineSpacing);
//     }
    
//     if (!addressesAreSame && shippingAddress) {
//       rightY += 1.5;
//       doc.setFont('helvetica', 'bold');
//       doc.text('Shipping Address:', addressColX + 5, rightY);
//       rightY += lineSpacing;
//       doc.setFont('helvetica', 'normal');
//       const shippingLines = doc.splitTextToSize(shippingAddress, (contentWidth / 2) - 15);
//       for (let i = 0; i < shippingLines.length; i++) {
//         doc.text(shippingLines[i], addressColX + 5, rightY + (i * lineSpacing));
//       }
//     } else if (addressesAreSame && billingAddress) {
//       rightY += 1.5;
//       doc.setFont('helvetica', 'italic');
//       doc.setTextColor(100, 100, 100);
//       doc.text('Shipping Address: Same as billing', addressColX + 5, rightY);
//     } else if (!billingAddress) {
//       doc.text('N/A', addressColX + 5, rightY);
//     }
    
//     yPos += colHeight + 10;

//     // // ==================== ITEMS TABLE ====================
//     // // Updated column positions for better size display
//     // const colPositions = {
//     //   item: margin + 3,
//     //   product: margin + 12,
//     //   color: margin + 50,
//     //   sizes: margin + 68,
//     //   qty: margin + contentWidth - 45,
//     //   price: margin + contentWidth - 30,
//     //   total: margin + contentWidth - 10
//     // };

//     // // Table Header
//     // doc.setFillColor(227, 154, 101);
//     // doc.rect(margin, yPos, contentWidth, 7, 'F');

//     // doc.setFontSize(7);
//     // doc.setFont('helvetica', 'bold');
//     // doc.setTextColor(255, 255, 255);

//     // doc.text('#', colPositions.item, yPos + 4.5);
//     // doc.text('Product', colPositions.product, yPos + 4.5);
//     // doc.text('Color', colPositions.color, yPos + 4.5);
//     // doc.text('Sizes (Size:Qty)', colPositions.sizes, yPos + 4.5);
//     // doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//     // doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
//     // doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });

//     // yPos += 10;

//     // let rowsUsed = 0;
//     // let itemNumber = 1;
    
//     // if (invoice.items && invoice.items.length > 0) {
//     //   for (const item of invoice.items) {
//     //     let firstColor = true;
        
//     //     if (item.colors && item.colors.length > 0) {
//     //       for (const color of item.colors) {
//     //         const activeSizes = color.sizeQuantities?.filter(sq => sq.quantity > 0) || [];
            
//     //         // Calculate required row height based on number of size lines
//     //         let requiredRowHeight = 4;
//     //         let sizeLines = [];
//     //         if (activeSizes.length > 0) {
//     //           const sizesText = activeSizes.map(sq => `${sq.size}:${sq.quantity}`).join(', ');
//     //           doc.setFontSize(5.5);
//     //           sizeLines = doc.splitTextToSize(sizesText, 45);
//     //           doc.setFontSize(6);
//     //           requiredRowHeight = Math.max(4, sizeLines.length * 3.5);
//     //         }
//     //         const rowHeight = requiredRowHeight;
            
//     //         // Check page break
//     //         if (yPos + rowHeight > pageHeight - 55) {
//     //           doc.addPage();
//     //           yPos = margin + 10;
//     //           rowsUsed = 0;
              
//     //           doc.setFillColor(227, 154, 101);
//     //           doc.rect(margin, yPos, contentWidth, 7, 'F');
//     //           doc.setFontSize(7);
//     //           doc.setFont('helvetica', 'bold');
//     //           doc.setTextColor(255, 255, 255);
//     //           doc.text('#', colPositions.item, yPos + 4.5);
//     //           doc.text('Product', colPositions.product, yPos + 4.5);
//     //           doc.text('Color', colPositions.color, yPos + 4.5);
//     //           doc.text('Sizes (Size:Qty)', colPositions.sizes, yPos + 4.5);
//     //           doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//     //           doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
//     //           doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
//     //           yPos += 10;
//     //         }

//     //         // Draw background
//     //         if (rowsUsed % 2 === 0) {
//     //           doc.setFillColor(250, 250, 250);
//     //           doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
//     //         }

//     //         doc.setFontSize(6);
//     //         doc.setFont('helvetica', 'normal');
//     //         doc.setTextColor(60, 60, 60);

//     //         // Item number
//     //         if (firstColor) {
//     //           doc.text(itemNumber.toString(), colPositions.item, yPos);
//     //         }

//     //         // Product name
//     //         if (firstColor) {
//     //           const productName = item.productName || '';
//     //           const shortName = productName.length > 20 ? productName.substring(0, 17) + '...' : productName;
//     //           doc.text(shortName, colPositions.product, yPos);
//     //         }

//     //         // Color circle (centered vertically)
//     //         const circleY = yPos + (rowHeight / 2) - 1;
//     //         const colorCode = color.color?.code || '#CCCCCC';
//     //         drawColorCircle(doc, colPositions.color + 2, circleY, 1.5, colorCode);
            
//     //         // Color name
//     //         let colorName = color.color?.name || color.color?.code || 'Color';
//     //         if (colorName.startsWith('#')) colorName = 'Color';
//     //         if (colorName.length > 12) colorName = colorName.substring(0, 10) + '...';
//     //         doc.text(colorName, colPositions.color + 7, yPos + (rowHeight / 2) - 1.5);

//     //         // Sizes (multi-line with proper alignment)
//     //         if (activeSizes.length > 0) {
//     //           doc.setFontSize(5.5);
//     //           for (let i = 0; i < sizeLines.length; i++) {
//     //             // Add bullet point for each line to show they belong together
//     //             const prefix = i === 0 ? '• ' : '  ';
//     //             doc.text(prefix + sizeLines[i], colPositions.sizes, yPos + (i * 3.5));
//     //           }
//     //           doc.setFontSize(6);
//     //         } else {
//     //           doc.text('-', colPositions.sizes, yPos);
//     //         }

//     //         // Quantity
//     //         const colorQty = color.totalForColor || 
//     //           color.sizeQuantities?.reduce((sum, sq) => sum + (sq.quantity || 0), 0) || 0;
//     //         doc.text(colorQty.toString(), colPositions.qty, yPos + (rowHeight / 2) - 1.5, { align: 'right' });

//     //         // Price (only for first color)
//     //         if (firstColor) {
//     //           doc.text(formatPrice(item.unitPrice || 0), colPositions.price, yPos + (rowHeight / 2) - 1.5, { align: 'right' });
//     //         }

//     //         // Total
//     //         const colorTotal = colorQty * (item.unitPrice || 0);
//     //         doc.setFont('helvetica', 'bold');
//     //         doc.text(formatPrice(colorTotal), colPositions.total, yPos + (rowHeight / 2) - 1.5, { align: 'right' });
//     //         doc.setFont('helvetica', 'normal');

//     //         yPos += rowHeight;
//     //         rowsUsed++;
//     //         firstColor = false;
//     //       }
//     //     } else {
//     //       // Simple product (no colors)
//     //       const rowHeight = 4;
          
//     //       if (yPos + rowHeight > pageHeight - 55) {
//     //         doc.addPage();
//     //         yPos = margin + 10;
//     //         rowsUsed = 0;
            
//     //         doc.setFillColor(227, 154, 101);
//     //         doc.rect(margin, yPos, contentWidth, 7, 'F');
//     //         doc.setFontSize(7);
//     //         doc.setFont('helvetica', 'bold');
//     //         doc.setTextColor(255, 255, 255);
//     //         doc.text('#', colPositions.item, yPos + 4.5);
//     //         doc.text('Product', colPositions.product, yPos + 4.5);
//     //         doc.text('Color', colPositions.color, yPos + 4.5);
//     //         doc.text('Sizes (Size:Qty)', colPositions.sizes, yPos + 4.5);
//     //         doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//     //         doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
//     //         doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
//     //         yPos += 10;
//     //       }

//     //       if (rowsUsed % 2 === 0) {
//     //         doc.setFillColor(250, 250, 250);
//     //         doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
//     //       }

//     //       doc.setFontSize(6);
//     //       doc.setFont('helvetica', 'normal');
          
//     //       doc.text(itemNumber.toString(), colPositions.item, yPos);
          
//     //       const productName = item.productName || '';
//     //       const shortName = productName.length > 20 ? productName.substring(0, 17) + '...' : productName;
//     //       doc.text(shortName, colPositions.product, yPos);
          
//     //       drawColorCircle(doc, colPositions.color + 2, yPos - 1, 1.5, '#CCCCCC');
//     //       doc.text('-', colPositions.sizes, yPos);
          
//     //       const totalQty = item.totalQuantity || 0;
//     //       doc.text(totalQty.toString(), colPositions.qty, yPos, { align: 'right' });
//     //       doc.text(formatPrice(item.unitPrice || 0), colPositions.price, yPos, { align: 'right' });
          
//     //       doc.setFont('helvetica', 'bold');
//     //       doc.text(formatPrice(item.total || 0), colPositions.total, yPos, { align: 'right' });

//     //       yPos += rowHeight;
//     //       rowsUsed++;
//     //     }
//     //     itemNumber++;
//     //   }
//     // }

//     // yPos += 6;

//     // ==================== ITEMS TABLE ====================
// // ==================== ITEMS TABLE ====================
// // ==================== ITEMS TABLE ====================
// // Updated column positions for better size display - INCREASED sizes column width
// const colPositions = {
//   item: margin + 3,
//   product: margin + 10,      // Reduced to give more space to sizes
//   color: margin + 45,        // Adjusted
//   sizes: margin + 60,        // INCREASED from 68 to 60 (more space for sizes)
//   qty: margin + contentWidth - 42,
//   price: margin + contentWidth - 28,
//   total: margin + contentWidth - 10
// };

// // Table Header
// doc.setFillColor(227, 154, 101);
// doc.rect(margin, yPos, contentWidth, 7, 'F');

// doc.setFontSize(7);
// doc.setFont('helvetica', 'bold');
// doc.setTextColor(255, 255, 255);

// doc.text('#', colPositions.item, yPos + 4.5);
// doc.text('Product', colPositions.product, yPos + 4.5);
// doc.text('Color', colPositions.color, yPos + 4.5);
// doc.text('Sizes (Size:Qty)', colPositions.sizes, yPos + 4.5);
// doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
// doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
// doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });

// yPos += 10;

// let rowsUsed = 0;
// let itemNumber = 1;

// if (invoice.items && invoice.items.length > 0) {
//   for (const item of invoice.items) {
//     let firstColor = true;
    
//     if (item.colors && item.colors.length > 0) {
//       // First, calculate all rows and their heights for this product
//       const colorRows = [];
      
//       for (const color of item.colors) {
//         const activeSizes = color.sizeQuantities?.filter(sq => sq.quantity > 0) || [];
        
//         // Format sizes - try to keep on ONE line with smaller font
//         let sizeLines = [];
//         if (activeSizes.length > 0) {
//           // Create a single string of all sizes
//           const allSizesText = activeSizes.map(sq => `${sq.size}:${sq.quantity}`).join(', ');
          
//           // Use smaller font to fit more sizes
//           doc.setFontSize(5.0); // Reduced from 5.5 to 5.0
//           const maxWidth = 55; // INCREASED from 45 to 55 for more space
//           const textWidth = doc.getTextWidth(allSizesText);
          
//           if (textWidth <= maxWidth) {
//             // All sizes fit on one line
//             sizeLines = [allSizesText];
//           } else {
//             // Try to fit as many as possible on first line, rest on second line
//             let currentLine = '';
//             let remainingSizes = [...activeSizes];
            
//             for (let i = 0; i < activeSizes.length; i++) {
//               const sq = activeSizes[i];
//               const sizeText = `${sq.size}:${sq.quantity}`;
//               const testLine = currentLine ? `${currentLine}, ${sizeText}` : sizeText;
//               const testWidth = doc.getTextWidth(testLine);
              
//               if (testWidth <= maxWidth) {
//                 currentLine = testLine;
//                 remainingSizes.shift();
//               } else {
//                 if (currentLine) sizeLines.push(currentLine);
//                 currentLine = sizeText;
//               }
//             }
//             if (currentLine) sizeLines.push(currentLine);
            
//             // If we have more than 2 lines, try to redistribute
//             if (sizeLines.length > 2) {
//               // Reset and try with even distribution
//               sizeLines = [];
//               const sizesPerLine = Math.ceil(activeSizes.length / 2);
//               for (let i = 0; i < activeSizes.length; i += sizesPerLine) {
//                 const lineSizes = activeSizes.slice(i, i + sizesPerLine);
//                 const lineText = lineSizes.map(sq => `${sq.size}:${sq.quantity}`).join(', ');
//                 sizeLines.push(lineText);
//               }
//             }
//           }
//           doc.setFontSize(6);
//         } else {
//           sizeLines = ['-'];
//         }
        
//         // Reduce row height for multi-line sizes
//         const rowHeight = Math.max(4.5, sizeLines.length * 3.2);
        
//         colorRows.push({
//           color: color,
//           sizeLines: sizeLines,
//           rowHeight: rowHeight,
//           colorQty: color.totalForColor || 
//             color.sizeQuantities?.reduce((sum, sq) => sum + (sq.quantity || 0), 0) || 0,
//           colorTotal: (color.totalForColor || 
//             color.sizeQuantities?.reduce((sum, sq) => sum + (sq.quantity || 0), 0) || 0) * (item.unitPrice || 0)
//         });
//       }
      
//       // Now render each color row
//       for (let colorIndex = 0; colorIndex < colorRows.length; colorIndex++) {
//         const row = colorRows[colorIndex];
//         const rowStartY = yPos;
//         const rowHeight = row.rowHeight;
        
//         // Check page break
//         if (yPos + rowHeight > pageHeight - 55) {
//           doc.addPage();
//           yPos = margin + 10;
//           rowsUsed = 0;
          
//           doc.setFillColor(227, 154, 101);
//           doc.rect(margin, yPos, contentWidth, 7, 'F');
//           doc.setFontSize(7);
//           doc.setFont('helvetica', 'bold');
//           doc.setTextColor(255, 255, 255);
//           doc.text('#', colPositions.item, yPos + 4.5);
//           doc.text('Product', colPositions.product, yPos + 4.5);
//           doc.text('Color', colPositions.color, yPos + 4.5);
//           doc.text('Sizes (Size:Qty)', colPositions.sizes, yPos + 4.5);
//           doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//           doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
//           doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
//           yPos += 10;
//         }

//         // Draw background for this row
//         if (rowsUsed % 2 === 0) {
//           doc.setFillColor(250, 250, 250);
//           doc.rect(margin, rowStartY - 2, contentWidth, rowHeight, 'F');
//         }

//         doc.setFontSize(6);
//         doc.setFont('helvetica', 'normal');
//         doc.setTextColor(60, 60, 60);

//         // MOVED HIGHER - position elements at the very top of the row
//         const textY = rowStartY + 1.2;  // Moved higher (was 1.8)
//         const circleY = rowStartY + 1.5;  // Moved higher (was 2)
//         const circleRadius = 0.9;

//         // Item number (only for first color of this product)
//         if (colorIndex === 0) {
//           doc.text(itemNumber.toString(), colPositions.item, textY);
//         }

//         // Product name (only for first color of this product)
//         if (colorIndex === 0) {
//           let productName = item.productName || '';
//           // Truncate product name to fit
//           const maxProductWidth = 30;
//           doc.setFontSize(5.5);
//           while (doc.getTextWidth(productName) > maxProductWidth && productName.length > 3) {
//             productName = productName.substring(0, productName.length - 1);
//           }
//           if (productName !== (item.productName || '')) {
//             productName = productName.substring(0, productName.length - 3) + '...';
//           }
//           doc.text(productName, colPositions.product, textY);
//           doc.setFontSize(6);
//         }

//         // Color circle - positioned HIGHER to prevent hiding
//         const colorCode = row.color.color?.code || '#CCCCCC';
//         drawColorCircle(doc, colPositions.color + 2, circleY, circleRadius, colorCode);
        
//         // Color name - positioned HIGHER
//         let colorName = row.color.color?.name || row.color.color?.code || 'Color';
//         if (colorName.startsWith('#')) colorName = '';
//         if (colorName.length > 8) colorName = colorName.substring(0, 6) + '..';
//         doc.setFontSize(5.5);
//         doc.text(colorName, colPositions.color + 6, textY);
//         doc.setFontSize(6);

//         // Sizes - starting from top
//         if (row.sizeLines.length > 0 && row.sizeLines[0] !== '-') {
//           doc.setFontSize(5.0);
//           for (let i = 0; i < row.sizeLines.length; i++) {
//             doc.text(row.sizeLines[i], colPositions.sizes, textY + (i * 3.2));
//           }
//           doc.setFontSize(6);
//         } else {
//           doc.text('-', colPositions.sizes, textY);
//         }

//         // Quantity
//         doc.setFontSize(5.5);
//         doc.text(row.colorQty.toString(), colPositions.qty, textY, { align: 'right' });

//         // Price (only for first color)
//         if (colorIndex === 0) {
//           doc.text(formatPrice(item.unitPrice || 0), colPositions.price, textY, { align: 'right' });
//         }

//         // Total
//         doc.setFont('helvetica', 'bold');
//         doc.setFontSize(5.5);
//         doc.text(formatPrice(row.colorTotal), colPositions.total, textY, { align: 'right' });
//         doc.setFont('helvetica', 'normal');
//         doc.setFontSize(6);

//         // Move to next row
//         yPos += rowHeight;
//         rowsUsed++;
//       }
//     } else {
//       // Simple product (no colors)
//       const rowHeight = 4.5;
      
//       if (yPos + rowHeight > pageHeight - 55) {
//         doc.addPage();
//         yPos = margin + 10;
//         rowsUsed = 0;
        
//         doc.setFillColor(227, 154, 101);
//         doc.rect(margin, yPos, contentWidth, 7, 'F');
//         doc.setFontSize(7);
//         doc.setFont('helvetica', 'bold');
//         doc.setTextColor(255, 255, 255);
//         doc.text('#', colPositions.item, yPos + 4.5);
//         doc.text('Product', colPositions.product, yPos + 4.5);
//         doc.text('Color', colPositions.color, yPos + 4.5);
//         doc.text('Sizes (Size:Qty)', colPositions.sizes, yPos + 4.5);
//         doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//         doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
//         doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
//         yPos += 10;
//       }

//       if (rowsUsed % 2 === 0) {
//         doc.setFillColor(250, 250, 250);
//         doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
//       }

//       doc.setFontSize(5.5);
//       doc.setFont('helvetica', 'normal');
      
//       // MOVED HIGHER
//       const textY = yPos + 1.2;
//       const circleY = yPos + 1.5;
//       const circleRadius = 0.9;
      
//       doc.text(itemNumber.toString(), colPositions.item, textY);
      
//       let productName = item.productName || '';
//       const maxProductWidth = 30;
//       while (doc.getTextWidth(productName) > maxProductWidth && productName.length > 3) {
//         productName = productName.substring(0, productName.length - 1);
//       }
//       if (productName !== (item.productName || '')) {
//         productName = productName.substring(0, productName.length - 3) + '...';
//       }
//       doc.text(productName, colPositions.product, textY);
      
//       drawColorCircle(doc, colPositions.color + 2, circleY, circleRadius, '#CCCCCC');
//       doc.text('-', colPositions.sizes, textY);
      
//       const totalQty = item.totalQuantity || 0;
//       doc.text(totalQty.toString(), colPositions.qty, textY, { align: 'right' });
//       doc.text(formatPrice(item.unitPrice || 0), colPositions.price, textY, { align: 'right' });
      
//       doc.setFont('helvetica', 'bold');
//       doc.text(formatPrice(item.total || 0), colPositions.total, textY, { align: 'right' });

//       yPos += rowHeight;
//       rowsUsed++;
//     }
//     itemNumber++;
//   }
// }

//     // ==================== SUMMARY SECTION ====================
//     const summaryWidth = 85;
//     const summaryX = pageWidth - margin - summaryWidth;
    
//     doc.setFillColor(245, 245, 245);
//     doc.roundedRect(summaryX, yPos, summaryWidth, 38, 2, 2, 'F');

//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(0, 0, 0);
//     doc.text('SUMMARY', summaryX + 3, yPos + 5);

//     let summaryY = yPos + 9;
//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');

//     const subtotal = invoice.subtotal || 0;
//     const vatPercentage = invoice.vatPercentage || 0;
//     const vatAmount = invoice.vatAmount || 0;
//     const discountPercentage = invoice.discountPercentage || 0;
//     const discountAmount = invoice.discountAmount || 0;
//     const shippingCost = invoice.shippingCost || 0;
//     const finalTotal = invoice.finalTotal || 0;
//     const amountPaid = invoice.amountPaid || 0;
//     const dueAmount = invoice.dueAmount || 0;

//     doc.text('Subtotal:', summaryX + 3, summaryY);
//     doc.text(formatPrice(subtotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//     summaryY += 3.5;

//     if (vatPercentage > 0) {
//       doc.text(`VAT ${vatPercentage}%:`, summaryX + 3, summaryY);
//       doc.text(formatPrice(vatAmount), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//       summaryY += 3.5;
//     }

//     if (discountPercentage > 0) {
//       doc.text(`Disc ${discountPercentage}%:`, summaryX + 3, summaryY);
//       doc.text(`-${formatPrice(discountAmount)}`, summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//       summaryY += 3.5;
//     }

//     if (shippingCost > 0) {
//       doc.text('Shipping:', summaryX + 3, summaryY);
//       doc.text(formatPrice(shippingCost), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//       summaryY += 3.5;
//     }

//     doc.setDrawColor(200, 200, 200);
//     doc.line(summaryX + 3, summaryY - 1, summaryX + summaryWidth - 3, summaryY - 1);
    
//     summaryY += 2;
    
//     doc.setFont('helvetica', 'bold');
//     doc.text('TOTAL:', summaryX + 3, summaryY);
//     doc.text(formatPrice(finalTotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });

//     const paymentY = summaryY + 4;
    
//     doc.setFontSize(5.5);
//     doc.setFont('helvetica', 'normal');
    
//     doc.setTextColor(34, 197, 94);
//     doc.text(`Paid: ${formatPrice(amountPaid)} (${finalTotal > 0 ? ((amountPaid / finalTotal) * 100).toFixed(1) : '0'}%)`, summaryX + 3, paymentY);
    
//     doc.setTextColor(dueAmount > 0 ? 239 : 34, dueAmount > 0 ? 68 : 197, dueAmount > 0 ? 68 : 94);
//     doc.text(`Due: ${formatPrice(dueAmount)} (${finalTotal > 0 ? ((dueAmount / finalTotal) * 100).toFixed(1) : '0'}%)`, summaryX + 3, paymentY + 3.5);

//     // ==================== BANK DETAILS & BANKING TERMS ====================
//     yPos += 48;
    
//     if (yPos > pageHeight - 45) {
//       doc.addPage();
//       yPos = margin + 10;
//     }
    
//     const leftColWidth = (contentWidth / 2) - 3;
//     const bankingTermsColX = margin + (contentWidth / 2) + 3;
    
//     // Left Column - Bank Details
//     if (invoice.bankDetails && Object.values(invoice.bankDetails).some(v => v)) {
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(0, 0, 0);
//       doc.text('BANK DETAILS', margin, yPos);

//       doc.setFontSize(5.5);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(80, 80, 80);

//       const bankLines = [];
//       if (invoice.bankDetails.bankName) bankLines.push(`Bank: ${invoice.bankDetails.bankName}`);
//       if (invoice.bankDetails.accountName) bankLines.push(`A/C Name: ${invoice.bankDetails.accountName}`);
//       if (invoice.bankDetails.accountNumber) bankLines.push(`A/C No: ${invoice.bankDetails.accountNumber}`);
//       if (invoice.bankDetails.accountType) bankLines.push(`Account Type: ${invoice.bankDetails.accountType}`);
//       if (invoice.bankDetails.routingNumber) bankLines.push(`Routing No: ${invoice.bankDetails.routingNumber}`);
//       if (invoice.bankDetails.swiftCode) bankLines.push(`SWIFT: ${invoice.bankDetails.swiftCode}`);
//       if (invoice.bankDetails.iban) bankLines.push(`IBAN: ${invoice.bankDetails.iban}`);
//       if (invoice.bankDetails.bankAddress) {
//         const addressLines = doc.splitTextToSize(`Address: ${invoice.bankDetails.bankAddress}`, leftColWidth - 5);
//         bankLines.push(...addressLines);
//       }

//       bankLines.forEach((line, index) => {
//         doc.text(line, margin, yPos + 4 + (index * 3));
//       });
      
//       const bankLinesCount = bankLines.length;
//       const bankDetailsHeight = bankLinesCount * 3 + 8;
      
//       // Right Column - Banking Terms
//       if (invoice.bankingTerms && invoice.bankingTerms.length > 0) {
//         doc.setFontSize(7);
//         doc.setFont('helvetica', 'bold');
//         doc.setTextColor(0, 0, 0);
//         doc.text('BANKING TERMS', bankingTermsColX, yPos);
        
//         doc.setFontSize(5.5);
//         doc.setFont('helvetica', 'normal');
//         doc.setTextColor(80, 80, 80);
        
//         let termsY = yPos + 4;
//         const bulletPoint = '• ';
//         const termWidth = (contentWidth / 2) - 15;
        
//         const termsWithValue = invoice.bankingTerms.filter(term => term.value && term.value.trim() !== '');
//         const termsWithoutValue = invoice.bankingTerms.filter(term => !term.value || term.value.trim() === '');
        
//         for (const term of termsWithValue) {
//           if (term.title) {
//             const titleLines = doc.splitTextToSize(term.title, termWidth);
//             for (let i = 0; i < titleLines.length; i++) {
//               const prefix = i === 0 ? bulletPoint : '  ';
//               doc.text(prefix + titleLines[i], bankingTermsColX, termsY);
//               termsY += 2.8;
//             }
            
//             if (term.value) {
//               const valueLines = doc.splitTextToSize(term.value, termWidth);
//               for (const line of valueLines) {
//                 doc.text('  ' + line, bankingTermsColX, termsY);
//                 termsY += 2.5;
//               }
//             }
//             termsY += 1.5;
//           } else if (term.value) {
//             const valueLines = doc.splitTextToSize(term.value, termWidth);
//             for (const line of valueLines) {
//               doc.text(bulletPoint + line, bankingTermsColX, termsY);
//               termsY += 2.8;
//             }
//             termsY += 1.5;
//           }
//         }
        
//         for (const term of termsWithoutValue) {
//           if (term.title) {
//             const titleLines = doc.splitTextToSize(term.title, termWidth);
//             for (let i = 0; i < titleLines.length; i++) {
//               const prefix = i === 0 ? bulletPoint : '  ';
//               doc.text(prefix + titleLines[i], bankingTermsColX, termsY);
//               termsY += 2.8;
//             }
//             termsY += 1;
//           }
//         }
//       }
      
//       yPos += Math.max(bankDetailsHeight, 25);
//     } else if (invoice.bankingTerms && invoice.bankingTerms.length > 0) {
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(0, 0, 0);
//       doc.text('BANKING TERMS', bankingTermsColX, yPos);
      
//       doc.setFontSize(5.5);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(80, 80, 80);
      
//       let termsY = yPos + 4;
//       const bulletPoint = '• ';
//       const termWidth = (contentWidth / 2) - 15;
      
//       const termsWithValue = invoice.bankingTerms.filter(term => term.value && term.value.trim() !== '');
//       const termsWithoutValue = invoice.bankingTerms.filter(term => !term.value || term.value.trim() === '');
      
//       for (const term of termsWithValue) {
//         if (term.title) {
//           const titleLines = doc.splitTextToSize(term.title, termWidth);
//           for (let i = 0; i < titleLines.length; i++) {
//             const prefix = i === 0 ? bulletPoint : '  ';
//             doc.text(prefix + titleLines[i], bankingTermsColX, termsY);
//             termsY += 2.8;
//           }
          
//           if (term.value) {
//             const valueLines = doc.splitTextToSize(term.value, termWidth);
//             for (const line of valueLines) {
//               doc.text('  ' + line, bankingTermsColX, termsY);
//               termsY += 2.5;
//             }
//           }
//           termsY += 1.5;
//         } else if (term.value) {
//           const valueLines = doc.splitTextToSize(term.value, termWidth);
//           for (const line of valueLines) {
//             doc.text(bulletPoint + line, bankingTermsColX, termsY);
//             termsY += 2.8;
//           }
//           termsY += 1.5;
//         }
//       }
      
//       for (const term of termsWithoutValue) {
//         if (term.title) {
//           const titleLines = doc.splitTextToSize(term.title, termWidth);
//           for (let i = 0; i < titleLines.length; i++) {
//             const prefix = i === 0 ? bulletPoint : '  ';
//             doc.text(prefix + titleLines[i], bankingTermsColX, termsY);
//             termsY += 2.8;
//           }
//           termsY += 1;
//         }
//       }
      
//       yPos += 25;
//     } else {
//       yPos += 15;
//     }

//     // ==================== NOTES & TERMS ====================
//     yPos += 5;
    
//     if (yPos > pageHeight - 35) {
//       doc.addPage();
//       yPos = margin + 10;
//     }

//     doc.setDrawColor(200, 200, 200);
//     doc.line(margin, yPos, pageWidth - margin, yPos);
//     yPos += 5;

//     if (invoice.notes) {
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(0, 0, 0);
//       doc.text('NOTES:', margin, yPos);
      
//       doc.setFontSize(6);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(80, 80, 80);
      
//       const noteLines = doc.splitTextToSize(invoice.notes, contentWidth);
//       doc.text(noteLines, margin, yPos + 3.5);
//       yPos += (noteLines.length * 3.5) + 5;
//     }

//     if (invoice.terms) {
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(0, 0, 0);
//       doc.text('TERMS & CONDITIONS:', margin, yPos);
      
//       doc.setFontSize(6);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(80, 80, 80);
      
//       const termsLines = doc.splitTextToSize(invoice.terms, contentWidth);
//       doc.text(termsLines, margin, yPos + 3.5);
//     }

//     // ==================== FOOTER ====================
//     const footerY = pageHeight - 5;
    
//     doc.setDrawColor(200, 200, 200);
//     doc.setLineWidth(0.2);
//     doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);
    
//     doc.setFontSize(5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(150, 150, 150);
    
//     const today = new Date();
//     const dateString = today.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     }).replace(/,/g, '');
    
//     doc.text(`Invoice #${invoice.invoiceNumber} | Generated ${dateString}`, margin, footerY);
//     doc.text(invoice.company?.companyName || 'Asian Clothify', pageWidth - margin, footerY, { align: 'right' });

// // Generate and download PDF
// const pdfBlob = doc.output('blob');
// const url = URL.createObjectURL(pdfBlob);
// const link = document.createElement('a');
// link.href = url;
// link.download = `Invoice_${invoice.invoiceNumber}.pdf`;
// document.body.appendChild(link);
// link.click();
// document.body.removeChild(link);
// URL.revokeObjectURL(url);

// return { success: true, fileName: `Invoice_${invoice.invoiceNumber}.pdf` };
    
//   } catch (error) {
//     console.error('PDF Generation Error:', error);
//     throw error;
//   }
// };


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
    doc.rect(0, 0, pageWidth, 32, 'F');
    
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, yPos, contentWidth, 26, 2, 2, 'F');

    // Logo
    const logoSize = 16;
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
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
      }
    } else {
      const companyName = invoice.company?.companyName || 'Asian Clothify';
      const initials = getCompanyInitials(companyName);
      doc.setFillColor(227, 154, 101);
      doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
    }

    // Company Info
    const companyX = logoX + logoSize + 8;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(invoice.company?.companyName || 'Asian Clothify', companyX, logoY + 5);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    if (invoice.company?.contactPerson) {
      doc.setFont('helvetica', 'bold');
      doc.text('Contact: ', companyX, logoY + 10);
      const contactLabelWidth = doc.getTextWidth('Contact: ');
      doc.setFont('helvetica', 'normal');
      doc.text(invoice.company.contactPerson, companyX + contactLabelWidth, logoY + 10);
    } else {
      doc.setFont('helvetica', 'bold');
      doc.text('Contact: ', companyX, logoY + 10);
      doc.setFont('helvetica', 'normal');
      doc.text('N/A', companyX + doc.getTextWidth('Contact: '), logoY + 10);
    }

    doc.setFontSize(6.5);
    const emailPhone = `${invoice.company?.email || 'info@asianclothify.com'} | ${invoice.company?.phone || '+8801305-785685'}`;
    doc.text(emailPhone, companyX, logoY + 14);

    if (invoice.company?.address) {
      doc.setFontSize(6);
      const addressLines = doc.splitTextToSize(invoice.company.address, 70);
      doc.text(addressLines, companyX, logoY + 18);
    }

    // Invoice Number and Details
    const rightAlignX = pageWidth - margin - 5;
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(227, 154, 101);
    const invoiceNoText = `INVOICE NO: `;
    doc.text(invoiceNoText, rightAlignX - doc.getTextWidth(invoiceNoText + (invoice.invoiceNumber || '')), yPos + 8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(invoice.invoiceNumber || '', rightAlignX, yPos + 8, { align: 'right' });

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    
    const invoiceDate = formatDate(invoice.invoiceDate);
    const dueDate = formatDate(invoice.dueDate);
    const status = invoice.paymentStatus?.toUpperCase() || 'UNPAID';
    const inquiryRef = invoice.inquiryNumber || 'N/A';
    
    doc.text(`Date: ${invoiceDate}`, rightAlignX, yPos + 11.5, { align: 'right' });
    doc.text(`Due: ${dueDate}`, rightAlignX, yPos + 15.5, { align: 'right' });
    doc.text(`Status: ${status}`, rightAlignX, yPos + 19.5, { align: 'right' });
    doc.text(`Ref: ${inquiryRef}`, rightAlignX, yPos + 23.5, { align: 'right' });

    // ==================== CUSTOMER INFO SECTION ====================
    yPos += 34;
    
    const billingAddress = [
      invoice.customer?.billingAddress,
      invoice.customer?.billingCity,
      invoice.customer?.billingZipCode,
      invoice.customer?.billingCountry
    ].filter(Boolean).join(', ');
    
    const shippingAddress = [
      invoice.customer?.shippingAddress,
      invoice.customer?.shippingCity,
      invoice.customer?.shippingZipCode,
      invoice.customer?.shippingCountry
    ].filter(Boolean).join(', ');
    
    const addressesAreSame = billingAddress === shippingAddress && billingAddress !== '';

    let leftColHeight = 20;
    let rightColHeight = 20;
    
    if (billingAddress) {
      const billingLines = doc.splitTextToSize(billingAddress, (contentWidth / 2) - 10);
      rightColHeight += 4 + (billingLines.length * 3.5);
    }
    
    if (!addressesAreSame && shippingAddress) {
      const shippingLines = doc.splitTextToSize(shippingAddress, (contentWidth / 2) - 10);
      rightColHeight += 4 + (shippingLines.length * 3.5);
    } else if (addressesAreSame && billingAddress) {
      rightColHeight += 4 + 3.5;
    }
    
    const colHeight = Math.max(leftColHeight, rightColHeight);
    
    // Left Column - Customer Info
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(margin, yPos, (contentWidth / 2) - 3, colHeight, 2, 2, 'F');
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('CUSTOMER INFO', margin + 5, yPos + 5);
    
    let leftY = yPos + 10;
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(invoice.customer?.companyName || 'N/A', margin + 5, leftY);
    leftY += 4.5;
    
    doc.setFont('helvetica', 'normal');
    if (invoice.customer?.contactPerson) {
      doc.text(invoice.customer.contactPerson, margin + 5, leftY);
      leftY += 4.5;
    }
    
    if (invoice.customer?.email) {
      doc.text(invoice.customer.email, margin + 5, leftY);
      leftY += 4.5;
    }
    
    if (invoice.customer?.phone) {
      doc.text(invoice.customer.phone, margin + 5, leftY);
    }
    
    // Right Column - Address
    const addressColX = margin + (contentWidth / 2) + 3;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(addressColX, yPos, (contentWidth / 2) - 3, colHeight, 2, 2, 'F');
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('ADDRESS', addressColX + 5, yPos + 5);
    
    let rightY = yPos + 10;
    let lineSpacing = 3.5;
    
    if (billingAddress) {
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(80, 80, 80);
      doc.text('Billing Address:', addressColX + 5, rightY);
      rightY += lineSpacing;
      doc.setFont('helvetica', 'normal');
      const billingLines = doc.splitTextToSize(billingAddress, (contentWidth / 2) - 15);
      for (let i = 0; i < billingLines.length; i++) {
        doc.text(billingLines[i], addressColX + 5, rightY + (i * lineSpacing));
      }
      rightY += (billingLines.length * lineSpacing);
    }
    
    if (!addressesAreSame && shippingAddress) {
      rightY += 1.5;
      doc.setFont('helvetica', 'bold');
      doc.text('Shipping Address:', addressColX + 5, rightY);
      rightY += lineSpacing;
      doc.setFont('helvetica', 'normal');
      const shippingLines = doc.splitTextToSize(shippingAddress, (contentWidth / 2) - 15);
      for (let i = 0; i < shippingLines.length; i++) {
        doc.text(shippingLines[i], addressColX + 5, rightY + (i * lineSpacing));
      }
    } else if (addressesAreSame && billingAddress) {
      rightY += 1.5;
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      doc.text('Shipping Address: Same as billing', addressColX + 5, rightY);
    } else if (!billingAddress) {
      doc.text('N/A', addressColX + 5, rightY);
    }
    
    yPos += colHeight + 10;

    // ==================== ITEMS TABLE WITH PER-COLOR UNIT PRICE ====================
    // Updated column positions for better size display
    const colPositions = {
      item: margin + 3,
      product: margin + 10,
      color: margin + 45,
      sizes: margin + 60,
      qty: margin + contentWidth - 52,
      unitPrice: margin + contentWidth - 38,
      total: margin + contentWidth - 10
    };

    // Table Header
    doc.setFillColor(227, 154, 101);
    doc.rect(margin, yPos, contentWidth, 7, 'F');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);

    doc.text('#', colPositions.item, yPos + 4.5);
    doc.text('Product', colPositions.product, yPos + 4.5);
    doc.text('Color', colPositions.color, yPos + 4.5);
    doc.text('Sizes (Size:Qty)', colPositions.sizes, yPos + 4.5);
    doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
    doc.text('Unit Price', colPositions.unitPrice, yPos + 4.5, { align: 'right' });
    doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });

    yPos += 10;

    let rowsUsed = 0;
    let itemNumber = 1;
    
    if (invoice.items && invoice.items.length > 0) {
      for (const item of invoice.items) {
        let firstColor = true;
        
        if (item.colors && item.colors.length > 0) {
          // First, calculate all rows and their heights for this product
          const colorRows = [];
          
          for (const color of item.colors) {
            const activeSizes = color.sizeQuantities?.filter(sq => sq.quantity > 0) || [];
            
            // Get per-color unit price (use color.unitPrice, fallback to item.unitPrice)
            const colorUnitPrice = color.unitPrice || item.unitPrice || 0;
            
            // Format sizes - try to keep on ONE line with smaller font
            let sizeLines = [];
            if (activeSizes.length > 0) {
              // Create a single string of all sizes
              const allSizesText = activeSizes.map(sq => `${sq.size}:${sq.quantity}`).join(', ');
              
              // Use smaller font to fit more sizes
              doc.setFontSize(5.0);
              const maxWidth = 55;
              const textWidth = doc.getTextWidth(allSizesText);
              
              if (textWidth <= maxWidth) {
                // All sizes fit on one line
                sizeLines = [allSizesText];
              } else {
                // Try to fit as many as possible on first line, rest on second line
                let currentLine = '';
                let remainingSizes = [...activeSizes];
                
                for (let i = 0; i < activeSizes.length; i++) {
                  const sq = activeSizes[i];
                  const sizeText = `${sq.size}:${sq.quantity}`;
                  const testLine = currentLine ? `${currentLine}, ${sizeText}` : sizeText;
                  const testWidth = doc.getTextWidth(testLine);
                  
                  if (testWidth <= maxWidth) {
                    currentLine = testLine;
                    remainingSizes.shift();
                  } else {
                    if (currentLine) sizeLines.push(currentLine);
                    currentLine = sizeText;
                  }
                }
                if (currentLine) sizeLines.push(currentLine);
                
                // If we have more than 2 lines, try to redistribute
                if (sizeLines.length > 2) {
                  // Reset and try with even distribution
                  sizeLines = [];
                  const sizesPerLine = Math.ceil(activeSizes.length / 2);
                  for (let i = 0; i < activeSizes.length; i += sizesPerLine) {
                    const lineSizes = activeSizes.slice(i, i + sizesPerLine);
                    const lineText = lineSizes.map(sq => `${sq.size}:${sq.quantity}`).join(', ');
                    sizeLines.push(lineText);
                  }
                }
              }
              doc.setFontSize(6);
            } else {
              sizeLines = ['-'];
            }
            
            // Reduce row height for multi-line sizes
            const rowHeight = Math.max(4.5, sizeLines.length * 3.2);
            
            const colorQty = color.totalForColor || 
              color.sizeQuantities?.reduce((sum, sq) => sum + (sq.quantity || 0), 0) || 0;
            
            colorRows.push({
              color: color,
              sizeLines: sizeLines,
              rowHeight: rowHeight,
              colorQty: colorQty,
              colorUnitPrice: colorUnitPrice,
              colorTotal: colorQty * colorUnitPrice
            });
          }
          
          // Now render each color row
          for (let colorIndex = 0; colorIndex < colorRows.length; colorIndex++) {
            const row = colorRows[colorIndex];
            const rowStartY = yPos;
            const rowHeight = row.rowHeight;
            
            // Check page break
            if (yPos + rowHeight > pageHeight - 55) {
              doc.addPage();
              yPos = margin + 10;
              rowsUsed = 0;
              
              doc.setFillColor(227, 154, 101);
              doc.rect(margin, yPos, contentWidth, 7, 'F');
              doc.setFontSize(7);
              doc.setFont('helvetica', 'bold');
              doc.setTextColor(255, 255, 255);
              doc.text('#', colPositions.item, yPos + 4.5);
              doc.text('Product', colPositions.product, yPos + 4.5);
              doc.text('Color', colPositions.color, yPos + 4.5);
              doc.text('Sizes (Size:Qty)', colPositions.sizes, yPos + 4.5);
              doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
              doc.text('Unit Price', colPositions.unitPrice, yPos + 4.5, { align: 'right' });
              doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
              yPos += 10;
            }

            // Draw background for this row
            if (rowsUsed % 2 === 0) {
              doc.setFillColor(250, 250, 250);
              doc.rect(margin, rowStartY - 2, contentWidth, rowHeight, 'F');
            }

            doc.setFontSize(6);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(60, 60, 60);

            const textY = rowStartY + 1.2;
            const circleY = rowStartY + 1.5;
            const circleRadius = 0.9;

            // Item number (only for first color of this product)
            if (colorIndex === 0) {
              doc.text(itemNumber.toString(), colPositions.item, textY);
            }

            // Product name (only for first color of this product)
            if (colorIndex === 0) {
              let productName = item.productName || '';
              const maxProductWidth = 30;
              doc.setFontSize(5.5);
              while (doc.getTextWidth(productName) > maxProductWidth && productName.length > 3) {
                productName = productName.substring(0, productName.length - 1);
              }
              if (productName !== (item.productName || '')) {
                productName = productName.substring(0, productName.length - 3) + '...';
              }
              doc.text(productName, colPositions.product, textY);
              doc.setFontSize(6);
            }

            // Color circle
            const colorCode = row.color.color?.code || '#CCCCCC';
            drawColorCircle(doc, colPositions.color + 2, circleY, circleRadius, colorCode);
            
            // Color name
            let colorName = row.color.color?.name || row.color.color?.code || 'Color';
            if (colorName.startsWith('#')) colorName = '';
            if (colorName.length > 8) colorName = colorName.substring(0, 6) + '..';
            doc.setFontSize(5.5);
            doc.text(colorName, colPositions.color + 6, textY);
            doc.setFontSize(6);

            // Sizes
            if (row.sizeLines.length > 0 && row.sizeLines[0] !== '-') {
              doc.setFontSize(5.0);
              for (let i = 0; i < row.sizeLines.length; i++) {
                doc.text(row.sizeLines[i], colPositions.sizes, textY + (i * 3.2));
              }
              doc.setFontSize(6);
            } else {
              doc.text('-', colPositions.sizes, textY);
            }

            // Quantity
            doc.setFontSize(5.5);
            doc.text(row.colorQty.toString(), colPositions.qty, textY, { align: 'right' });

            // Unit Price (per-color)
            doc.text(formatPrice(row.colorUnitPrice), colPositions.unitPrice, textY, { align: 'right' });

            // Total
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(5.5);
            doc.text(formatPrice(row.colorTotal), colPositions.total, textY, { align: 'right' });
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(6);

            // Move to next row
            yPos += rowHeight;
            rowsUsed++;
          }
        } else {
          // Simple product (no colors)
          const rowHeight = 4.5;
          
          if (yPos + rowHeight > pageHeight - 55) {
            doc.addPage();
            yPos = margin + 10;
            rowsUsed = 0;
            
            doc.setFillColor(227, 154, 101);
            doc.rect(margin, yPos, contentWidth, 7, 'F');
            doc.setFontSize(7);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text('#', colPositions.item, yPos + 4.5);
            doc.text('Product', colPositions.product, yPos + 4.5);
            doc.text('Color', colPositions.color, yPos + 4.5);
            doc.text('Sizes (Size:Qty)', colPositions.sizes, yPos + 4.5);
            doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
            doc.text('Unit Price', colPositions.unitPrice, yPos + 4.5, { align: 'right' });
            doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
            yPos += 10;
          }

          if (rowsUsed % 2 === 0) {
            doc.setFillColor(250, 250, 250);
            doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
          }

          doc.setFontSize(5.5);
          doc.setFont('helvetica', 'normal');
          
          const textY = yPos + 1.2;
          const circleY = yPos + 1.5;
          const circleRadius = 0.9;
          
          doc.text(itemNumber.toString(), colPositions.item, textY);
          
          let productName = item.productName || '';
          const maxProductWidth = 30;
          while (doc.getTextWidth(productName) > maxProductWidth && productName.length > 3) {
            productName = productName.substring(0, productName.length - 1);
          }
          if (productName !== (item.productName || '')) {
            productName = productName.substring(0, productName.length - 3) + '...';
          }
          doc.text(productName, colPositions.product, textY);
          
          drawColorCircle(doc, colPositions.color + 2, circleY, circleRadius, '#CCCCCC');
          doc.text('-', colPositions.sizes, textY);
          
          const totalQty = item.totalQuantity || 0;
          doc.text(totalQty.toString(), colPositions.qty, textY, { align: 'right' });
          doc.text(formatPrice(item.unitPrice || 0), colPositions.unitPrice, textY, { align: 'right' });
          
          doc.setFont('helvetica', 'bold');
          doc.text(formatPrice(item.total || 0), colPositions.total, textY, { align: 'right' });

          yPos += rowHeight;
          rowsUsed++;
        }
        itemNumber++;
      }
    }

    // ==================== SUMMARY SECTION ====================
    const summaryWidth = 85;
    const summaryX = pageWidth - margin - summaryWidth;
    
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(summaryX, yPos, summaryWidth, 38, 2, 2, 'F');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('SUMMARY', summaryX + 3, yPos + 5);

    let summaryY = yPos + 9;
    doc.setFontSize(6.5);
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

    doc.text('Subtotal:', summaryX + 3, summaryY);
    doc.text(formatPrice(subtotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
    summaryY += 3.5;

    if (vatPercentage > 0) {
      doc.text(`VAT ${vatPercentage}%:`, summaryX + 3, summaryY);
      doc.text(formatPrice(vatAmount), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
      summaryY += 3.5;
    }

    if (discountPercentage > 0) {
      doc.text(`Disc ${discountPercentage}%:`, summaryX + 3, summaryY);
      doc.text(`-${formatPrice(discountAmount)}`, summaryX + summaryWidth - 3, summaryY, { align: 'right' });
      summaryY += 3.5;
    }

    if (shippingCost > 0) {
      doc.text('Shipping:', summaryX + 3, summaryY);
      doc.text(formatPrice(shippingCost), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
      summaryY += 3.5;
    }

    doc.setDrawColor(200, 200, 200);
    doc.line(summaryX + 3, summaryY - 1, summaryX + summaryWidth - 3, summaryY - 1);
    
    summaryY += 2;
    
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL:', summaryX + 3, summaryY);
    doc.text(formatPrice(finalTotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });

    const paymentY = summaryY + 4;
    
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    
    doc.setTextColor(34, 197, 94);
    doc.text(`Paid: ${formatPrice(amountPaid)} (${finalTotal > 0 ? ((amountPaid / finalTotal) * 100).toFixed(1) : '0'}%)`, summaryX + 3, paymentY);
    
    doc.setTextColor(dueAmount > 0 ? 239 : 34, dueAmount > 0 ? 68 : 197, dueAmount > 0 ? 68 : 94);
    doc.text(`Due: ${formatPrice(dueAmount)} (${finalTotal > 0 ? ((dueAmount / finalTotal) * 100).toFixed(1) : '0'}%)`, summaryX + 3, paymentY + 3.5);

    // ==================== BANK DETAILS & BANKING TERMS ====================
    yPos += 48;
    
    if (yPos > pageHeight - 45) {
      doc.addPage();
      yPos = margin + 10;
    }
    
    const leftColWidth = (contentWidth / 2) - 3;
    const bankingTermsColX = margin + (contentWidth / 2) + 3;
    
    // Left Column - Bank Details
    if (invoice.bankDetails && Object.values(invoice.bankDetails).some(v => v)) {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('BANK DETAILS', margin, yPos);

      doc.setFontSize(5.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);

      const bankLines = [];
      if (invoice.bankDetails.bankName) bankLines.push(`Bank: ${invoice.bankDetails.bankName}`);
      if (invoice.bankDetails.accountName) bankLines.push(`A/C Name: ${invoice.bankDetails.accountName}`);
      if (invoice.bankDetails.accountNumber) bankLines.push(`A/C No: ${invoice.bankDetails.accountNumber}`);
      if (invoice.bankDetails.accountType) bankLines.push(`Account Type: ${invoice.bankDetails.accountType}`);
      if (invoice.bankDetails.routingNumber) bankLines.push(`Routing No: ${invoice.bankDetails.routingNumber}`);
      if (invoice.bankDetails.swiftCode) bankLines.push(`SWIFT: ${invoice.bankDetails.swiftCode}`);
      if (invoice.bankDetails.iban) bankLines.push(`IBAN: ${invoice.bankDetails.iban}`);
      if (invoice.bankDetails.bankAddress) {
        const addressLines = doc.splitTextToSize(`Address: ${invoice.bankDetails.bankAddress}`, leftColWidth - 5);
        bankLines.push(...addressLines);
      }

      bankLines.forEach((line, index) => {
        doc.text(line, margin, yPos + 4 + (index * 3));
      });
      
      const bankLinesCount = bankLines.length;
      const bankDetailsHeight = bankLinesCount * 3 + 8;
      
      // Right Column - Banking Terms
      if (invoice.bankingTerms && invoice.bankingTerms.length > 0) {
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('BANKING TERMS', bankingTermsColX, yPos);
        
        doc.setFontSize(5.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        
        let termsY = yPos + 4;
        const bulletPoint = '• ';
        const termWidth = (contentWidth / 2) - 15;
        
        const termsWithValue = invoice.bankingTerms.filter(term => term.value && term.value.trim() !== '');
        const termsWithoutValue = invoice.bankingTerms.filter(term => !term.value || term.value.trim() === '');
        
        for (const term of termsWithValue) {
          if (term.title) {
            const titleLines = doc.splitTextToSize(term.title, termWidth);
            for (let i = 0; i < titleLines.length; i++) {
              const prefix = i === 0 ? bulletPoint : '  ';
              doc.text(prefix + titleLines[i], bankingTermsColX, termsY);
              termsY += 2.8;
            }
            
            if (term.value) {
              const valueLines = doc.splitTextToSize(term.value, termWidth);
              for (const line of valueLines) {
                doc.text('  ' + line, bankingTermsColX, termsY);
                termsY += 2.5;
              }
            }
            termsY += 1.5;
          } else if (term.value) {
            const valueLines = doc.splitTextToSize(term.value, termWidth);
            for (const line of valueLines) {
              doc.text(bulletPoint + line, bankingTermsColX, termsY);
              termsY += 2.8;
            }
            termsY += 1.5;
          }
        }
        
        for (const term of termsWithoutValue) {
          if (term.title) {
            const titleLines = doc.splitTextToSize(term.title, termWidth);
            for (let i = 0; i < titleLines.length; i++) {
              const prefix = i === 0 ? bulletPoint : '  ';
              doc.text(prefix + titleLines[i], bankingTermsColX, termsY);
              termsY += 2.8;
            }
            termsY += 1;
          }
        }
      }
      
      yPos += Math.max(bankDetailsHeight, 25);
    } else if (invoice.bankingTerms && invoice.bankingTerms.length > 0) {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('BANKING TERMS', bankingTermsColX, yPos);
      
      doc.setFontSize(5.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      
      let termsY = yPos + 4;
      const bulletPoint = '• ';
      const termWidth = (contentWidth / 2) - 15;
      
      const termsWithValue = invoice.bankingTerms.filter(term => term.value && term.value.trim() !== '');
      const termsWithoutValue = invoice.bankingTerms.filter(term => !term.value || term.value.trim() === '');
      
      for (const term of termsWithValue) {
        if (term.title) {
          const titleLines = doc.splitTextToSize(term.title, termWidth);
          for (let i = 0; i < titleLines.length; i++) {
            const prefix = i === 0 ? bulletPoint : '  ';
            doc.text(prefix + titleLines[i], bankingTermsColX, termsY);
            termsY += 2.8;
          }
          
          if (term.value) {
            const valueLines = doc.splitTextToSize(term.value, termWidth);
            for (const line of valueLines) {
              doc.text('  ' + line, bankingTermsColX, termsY);
              termsY += 2.5;
            }
          }
          termsY += 1.5;
        } else if (term.value) {
          const valueLines = doc.splitTextToSize(term.value, termWidth);
          for (const line of valueLines) {
            doc.text(bulletPoint + line, bankingTermsColX, termsY);
            termsY += 2.8;
          }
          termsY += 1.5;
        }
      }
      
      for (const term of termsWithoutValue) {
        if (term.title) {
          const titleLines = doc.splitTextToSize(term.title, termWidth);
          for (let i = 0; i < titleLines.length; i++) {
            const prefix = i === 0 ? bulletPoint : '  ';
            doc.text(prefix + titleLines[i], bankingTermsColX, termsY);
            termsY += 2.8;
          }
          termsY += 1;
        }
      }
      
      yPos += 25;
    } else {
      yPos += 15;
    }

    // ==================== NOTES & TERMS ====================
    yPos += 5;
    
    if (yPos > pageHeight - 35) {
      doc.addPage();
      yPos = margin + 10;
    }

    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 5;

    if (invoice.notes) {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('NOTES:', margin, yPos);
      
      doc.setFontSize(6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      
      const noteLines = doc.splitTextToSize(invoice.notes, contentWidth);
      doc.text(noteLines, margin, yPos + 3.5);
      yPos += (noteLines.length * 3.5) + 5;
    }

    if (invoice.terms) {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('TERMS & CONDITIONS:', margin, yPos);
      
      doc.setFontSize(6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      
      const termsLines = doc.splitTextToSize(invoice.terms, contentWidth);
      doc.text(termsLines, margin, yPos + 3.5);
    }

    // ==================== FOOTER ====================
    const footerY = pageHeight - 5;
    
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
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

    // Generate and download PDF
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${invoice.invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true, fileName: `Invoice_${invoice.invoiceNumber}.pdf` };
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
};