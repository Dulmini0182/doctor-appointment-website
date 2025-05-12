describe('Add Doctor Form', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:4000/api/admin/login', {
      email: 'aaa@gmail.com',
      password: 'aaa1234'
    }).then((res) => {
      const token = res.body.token
      window.localStorage.setItem('aToken', token)
    })
    cy.visit('http://localhost:5174/add-doctor') // Adjust if needed
  })

  // it('should successfully fill and submit the form', () => {
  //   // Select image
  //   cy.get('input[type="file"]').selectFile('cypress/fixtures/doctor.jpg', { force: true })

  //   // Fill in the form fields
  //   cy.get('input[placeholder="Name"]').type('Dr. John Doe')
  //   cy.get('input[placeholder="Email"]').type('john@example.com')
  //   cy.get('input[placeholder="Password"]').type('strongpassword')
  //   cy.get('select').first().select('3 Year')
  //   cy.get('input[placeholder="Fees"]').type('1000')
  //   cy.get('select').eq(1).select('Gynecologist')
  //   cy.get('input[placeholder="Education"]').type('MBBS')
  //   cy.get('input[placeholder="address 1"]').type('123 Street')
  //   cy.get('input[placeholder="address 2"]').type('Colombo')
  //   cy.get('textarea[placeholder="Write about doctor"]').type('Experienced Gynecologist')

  //   // Submit the form
  //   cy.contains('Submit').click()

  //   // Assert success toast appears
  //   cy.contains('Doctor Added', { timeout: 10000 }).should('be.visible')
  // })
  
  // it('should show error for short password (less than 8 characters)', () => {
  //   // Select image
  //   cy.get('input[type="file"]').selectFile('cypress/fixtures/doctor.jpg', { force: true })
  
  //   cy.get('input[placeholder="Name"]').type('Dr. Jane Doe')
  //   cy.get('input[placeholder="Email"]').type('jane@example.com')
  //   cy.get('input[placeholder="Password"]').type('1234567') // 7 characters
  //   cy.get('select').first().select('5 Year')
  //   cy.get('input[placeholder="Fees"]').type('1200')
  //   cy.get('select').eq(1).select('Gynecologist')
  //   cy.get('input[placeholder="Education"]').type('MD')
  //   cy.get('input[placeholder="address 1"]').type('456 Lane')
  //   cy.get('input[placeholder="address 2"]').type('Kandy')
  //   cy.get('textarea[placeholder="Write about doctor"]').type('Expert Cardiologist')
  
  //   // Do not mock success — let it hit the real backend
  //   cy.contains('Submit').click()
  
  //   // Assert toast or error message
  //   cy.contains('Please enter a strong password', { timeout: 10000 }).should('be.visible')
  // })
  
  it('should show error for invalid email format', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/doctor.jpg', { force: true })
    cy.get('input[placeholder="Name"]').type('Dr. Invalid Email')
    cy.get('input[placeholder="Email"]').type('invalid-email') // <--- invalid email
    cy.get('input[placeholder="Password"]').type('validpass123')
    cy.get('select').first().select('3 Year')
    cy.get('input[placeholder="Fees"]').type('1500')
    cy.get('select').eq(1).select('Gynecologist')
    cy.get('input[placeholder="Education"]').type('MBBS')
    cy.get('input[placeholder="address 1"]').type('123 Street')
    cy.get('input[placeholder="address 2"]').type('Colombo')
    cy.get('textarea[placeholder="Write about doctor"]').type('Experienced doctor')

    cy.contains('Submit').click()

    cy.contains('Please enter a valid email', { timeout: 10000 }).should('be.visible')
  })

  })
