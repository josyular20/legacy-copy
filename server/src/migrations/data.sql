-- Active: 1702078735201@@127.0.0.1@5432@legacy
-- Creating test personas
INSERT INTO personas (persona_title, persona_description) VALUES 
('Procrastinating Rookie', 'Enjoys a challenge, scarcity mindset, the ultimate planner, a perfectionist, selfish, always on the edge, half-empty glass thinker, externally motivated, all-at-once worker, quick-start guide enthusiast, uncomfortable discussing death, less nurturing, inexperienced with EOLP, racing against time, tight finances, dipping toes in the water.'),
('Easygoing Explorer', 'Thrives on adventure, abundance advocate, let''s-see-what-happens future, content with ''good enough,'' empathetic, beach-level tranquility, sunny disposition, internally motivated, explores tasks over time, full novel enthusiast, comfortable discussing death, nurturing, fairly familiar with EOLP, no rush, tight finances, ready to start.'),
('Multitasking Dynamo', 'Loves a challenge, abundance believer, the ultimate planner, prefers perfection, selfish, edgy, half-empty glass view, externally motivated, all-at-once worker, quick-start guide fan, uncomfortable discussing death, less nurturing, somewhat familiar with EOLP, procrastinator, comfortable finances, at the starting line.'),
('Tranquil Trailblazer', 'Adventuresome, abundance thinker, let''s-see-what-happens future, content with ''good enough,'' empathetic, always at the beach, glass-half-full mentality, internally motivated, an explorer of tasks, quick-start guide lover, comfortable discussing death, nurturing, knowledgeable about EOLP, no rush, comfortable finances, ready to start.'),
('Adventurous Optimist', 'Always up for new experiences, believes in abundance, a laid-back planner, a chill perfectionist, empathetic, beach-level calmness, a sunny outlook, internally motivated, explores tasks over time, loves the full novel, comfortable discussing death, nurturing, well-versed in EOLP, has time to plan, financially stable, ready to start.');

-- Creating test users
INSERT INTO users (username, password, firebase_id, email, persona_id) VALUES 
('testuser1', 'password', 'abcdefgh', 'user1@example.com', 1),
('testuser2', 'password', 'ijklmn', 'user2@example.com', 2),
('testuser3', 'password', 'opqrst', 'user3@example.com', 3),
('testuser4', 'password', 'vwxyz', 'user4@example.com', 1),
('testuser5', 'password', '12345', 'user5@example.com', 2);

-- Creating user profile
INSERT INTO profiles (name, user_id, date_of_birth, phone_number) VALUES 
('Test User 1', 1, '1990-01-01', '5555555555'),
('Test User 2', 2, '1990-01-01', '5555555555'),
('Test User 3', 3, '1990-01-01', '5555555555'),
('Test User 4', 4, '1990-01-01', '5555555555'),
('Test User 5', 5, '1990-01-01', '5555555555');

-- Creating test tasks
INSERT INTO tasks (task_name, task_description) VALUES 
('Acknowledging Fear', 'Acknowledge your aversion to end of life planning'),
('Understanding EOLP', 'Create familiarity with the process'),
('Values and Priorities', 'Define your values and priorities'),
('Initial Plan', 'Create an initial end-of-life plan'),
('Existing Financials', 'Review your existing financial plan'),
('Non-financial Aspects', 'Explore non-financial aspects'),
('Will', 'Create a comprehensive will'),
('Specific Wishes', 'Communicate any specific wishes'),
('Plan Moving Forward', 'Regularly review and update'),
('Assemble Team', 'Assemble your financial team'),
('Living Trust', 'Establish a revocable living trust'),
('Tax Planning', 'Leverage tax planning strategies'),
('Family Governance', 'Develop a family governance plan.'),
('Emotional and Spiritual', 'Address emotional and spiritual concerns.'),
('Create Project', 'Create a legacy project');

-- Creating test tags
INSERT INTO tags (name) VALUES 
('Emotional'), -- Red
('Financial'), -- Green
('Value Based'), -- Orange
('Holistic'); -- Yellow

-- Creating test task_tags
INSERT INTO task_tags (task_id, tag_id) VALUES 
(1, 3), (2, 1), (3, 1), (4, 1), (5, 2), (6, 2), (7, 2), (8, 2), (9, 2), (10, 2), (11, 2), (12, 2), (13, 2), (14, 1), (15, 1);

-- Creating test subtask w/ actions
INSERT INTO sub_tasks (task_id, sub_task_name, sub_task_description, actions) VALUES
(1, 'Personal Information', 'Fill out our form so we can generate documents for your Legacy.',
'{
    "actions": [
        {
            "name": "full_name",
            "type": "text",
            "label": "Full Legal Name",
            "required": true,
            "action_type": "input",
            "placeholder": "Enter your full legal name"
        },
        {
            "name": "date_of_birth",
            "type": "date",
            "label": "Date of Birth",
            "required": true,
            "action_type": "input",
            "description": "Please enter your date of birth in the format: MM/DD/YYYY",
            "placeholder": "MM/DD/YYYY"
        },
        {
            "name": "ssn",
            "type": "text",
            "label": "Social Security Number",
            "required": true,
            "action_type": "input",
            "description": "Please provide your 9-digit social security number",
            "placeholder": "Enter your social security number"
        },
        {
            "name": "current_address",
            "type": "text",
            "label": "Current Address",
            "required": true,
            "action_type": "input",
            "description": "Please provide your complete current residential address",
            "placeholder": "Enter your current address"
        },
        {
            "name": "phone_number",
            "type": "tel",
            "label": "Phone Number",
            "required": true,
            "action_type": "input",
            "description": "Please provide a valid phone number where you can be reached",
            "placeholder": "Enter your phone number"
        },
        {
            "name": "email",
            "type": "email",
            "label": "Email Address",
            "required": true,
            "action_type": "input",
            "description": "Please provide a valid email address for communication purposes",
            "placeholder": "Enter your email address"
        },
        {
            "name": "marital_status",
            "label": "Marital Status",
            "options": [
                "Married",
                "Single",
                "Divorced",
                "Widowed"
            ],
            "required": true,
            "action_type": "select",
            "description": "Please select your current marital status from the options provided",
            "placeholder": "Select your marital status"
        },
        {
            "name": "additional_comments",
            "label": "Additional Comments",
            "required": false,
            "action_type": "textarea",
            "description": "Feel free to provide any additional information or comments here",
            "placeholder": "Enter any additional comments"
        }
    ]
}'),
(2, 'Create Checklist', 'Create a checklist of basic personal information needed for end-of-life planning.', 
'{
    "actions": [
        {
            "action_type": "textarea",
            "label": "List your personal information",
            "placeholder": "Enter your personal information",
            "name": "personal_information",
            "required": true,
            "description": "Please provide a list of your personal information"
        }
    ]
}'),
(6, 'Personal Values', 'Create a comprehensive list of your personal values, preferences, and priorities.',
'{
    "actions": [
        {
            "action_type": "list",
            "label": "List your personal values",
            "placeholder": "Enter your personal values",
            "name": "personal_values",
            "required": true,
            "description": "Please provide a list of your personal values"
        }
    ]
}'),
(6, 'Important Contacts', 'Select 3-5 important contacts to be notified in the event of an emergency.',
'{
    "actions": [
        {
            "action_type": "input",
            "label": "Contact 1",
            "placeholder": "Enter contact 1",
            "name": "contact_1",
            "type": "text",
            "required": true,
            "description": "Please provide the name of your first contact"
        },
        {
            "action_type": "input",
            "label": "Contact 2",
            "placeholder": "Enter contact 2",
            "name": "contact_2",
            "type": "text",
            "required": true,
            "description": "Please provide the name of your second contact"
        },
        {
            "action_type": "input",
            "label": "Contact 3",
            "placeholder": "Enter contact 3",
            "name": "contact_3",
            "type": "text",
            "required": true,
            "description": "Please provide the name of your third contact"
        },
        {
            "action_type": "input",
            "label": "Contact 4",
            "placeholder": "Enter contact 4",
            "name": "contact_4",
            "type": "text",
            "required": false,
            "description": "Please provide the name of your fourth contact"
        },
        {
            "action_type": "input",
            "label": "Contact 5",
            "placeholder": "Enter contact 5",
            "name": "contact_5",
            "type": "text",
            "required": false,
            "description": "Please provide the name of your fifth contact"
        }
    ]
}'),
(6, 'Organ Donation', 'Document your preferred organ donation choices.',
'{
    "actions": [
        {
            "action_type": "radio",
            "label": "Organ Donation",
            "name": "organ_donation",
            "options": [
                "Yes",
                "No"
            ],
            "required": true,
            "description": "Please select your preferred organ donation choice"
        }
    ]
}'),
(6, 'Burial/Cremation', 'Document your preferred burial or cremation preferences.',
'{
    "actions": [
        {
            "action_type": "radio",
            "label": "Burial or Cremation",
            "name": "burial_or_cremation",
            "options": [
                "Burial",
                "Cremation"
            ],
            "required": true,
            "description": "Please select your preferred burial or cremation choice"
        },
        {
            "action_type": "textarea",
            "label": "Funeral/Memorial Preferences",
            "placeholder": "Enter your funeral/memorial preferences",
            "name": "funeral_memorial_preferences",
            "required": false,
            "description": "Please provide your funeral/memorial preferences"
        },
        {
            "action_type": "input",
            "label": "Funeral/Memorial Location",
            "placeholder": "Enter your funeral/memorial location",
            "name": "funeral_memorial_location",
            "required": false,
            "description": "Please provide your funeral/memorial location"
        },
        {
            "action_type": "input",
            "label": "Funeral/Memorial Date",
            "placeholder": "Enter your funeral/memorial date",
            "name": "funeral_memorial_date",
            "required": false,
            "description": "Please provide your funeral/memorial date"
        }
    ]
}'),
(6, 'Eulogy', 'Create a eulogy for yourself.',
'{
    "actions": [
        {
            "action_type": "textarea",
            "label": "Eulogy",
            "placeholder": "Enter your eulogy",
            "name": "eulogy",
            "required": true,
            "description": "Please provide your eulogy"
        }
    ]
}'),
(4, 'Draft Intentions', 'Draft a simple letter of intent outlining your wishes for end-of-life care.',
'{
    "actions": [
        {
            "action_type": "textarea",
            "label": "Letter of Intent",
            "placeholder": "Enter your letter of intent",
            "name": "letter_of_intent",
            "required": true,
            "description": "Please provide your letter of intent"
        }
    ]
}'),
(4, 'Legal Plans', 'Complete healthcare proxies and power of attorney agents.',
'{
    "actions": [
        {
            "action_type": "input",
            "label": "Healthcare Proxies",
            "placeholder": "Enter your healthcare proxies",
            "name": "healthcare_proxies",
            "required": true,
            "description": "Please provide your healthcare proxies"
        },
        {
            "action_type": "input",
            "label": "Power of Attorney Agents",
            "placeholder": "Enter your power of attorney agents",
            "name": "power_of_attorney_agents",
            "required": true,
            "description": "Please provide your power of attorney agents"
        }
    ]
}'),
(3, 'Causes to Support', 'Identify specific causes or charities you would like to support.',
'{
    "actions": [
        {
            "action_type": "textarea",
            "label": "Causes to Support",
            "placeholder": "Enter your causes to support",
            "name": "causes_to_support",
            "required": true,
            "description": "Please provide your causes to support"
        }
    ]
}'),
(3, 'Legacy Statement', 'Write a legacy statement or ethical will to pass on your values to loved ones.',
'{
    "actions": [
        {
            "action_type": "input",
            "label": "Legacy Statement",
            "placeholder": "Title",
            "name": "legacy_statement_title",
            "required": true,
            "description": "Please provide a title for your legacy statement"
        },
        {
            "action_type": "textarea",
            "label": "Legacy Statement",
            "placeholder": "Enter your legacy statement",
            "name": "legacy_statement",
            "required": true,
            "description": "Please provide your legacy statement"
        }
    ]
}'), 
(3, 'Your Values', 'Write down your personal values and beliefs.',
'{
    "actions": [
        {
            "action_type": "textarea",
            "label": "Personal Values",
            "placeholder": "Enter your personal values",
            "name": "personal_values",
            "required": true,
            "description": "Please provide your personal values"
        }
    ]
}'),
(5, 'Financial Inventory', 'Conduct a thorough inventory of all financial accounts and assets.',
'{
    "actions": [
        {
            "action_type": "input",
            "label": "Financial Accounts",
            "placeholder": "Enter your financial accounts",
            "name": "financial_accounts",
            "required": true,
            "description": "Please provide your financial accounts"
        },
        {
            "action_type": "input",
            "label": "Financial Assets",
            "placeholder": "Enter your financial assets",
            "name": "financial_assets",
            "required": true,
            "description": "Please provide your financial assets"
        },
        {
            "action_type": "input",
            "label": "Financial Liabilities",
            "placeholder": "Enter your financial liabilities",
            "name": "financial_liabilities",
            "required": true,
            "description": "Please provide your financial liabilities"
        }
    ]
}'),
(5, 'Life Insurance', 'Review and update your life insurance policies, including coverage amounts and beneficiaries.',
'{
    "actions": [
        {
            "action_type": "input",
            "label": "Life Insurance",
            "placeholder": "Enter your life insurance policies",
            "name": "life_insurance",
            "required": true,
            "description": "Please provide your life insurance policies"
        },
        {
            "action_type": "input",
            "label": "Life Insurance Beneficiaries",
            "placeholder": "Enter your life insurance beneficiaries",
            "name": "life_insurance_beneficiaries",
            "required": true,
            "description": "Please provide your life insurance beneficiaries"
        },
        {
            "action_type": "input",
            "label": "Life Insurance Coverage Amounts",
            "placeholder": "Enter your life insurance coverage amounts",
            "name": "life_insurance_coverage_amounts",
            "required": true,
            "description": "Please provide your life insurance coverage amounts"
        },
        {
            "action_type": "checkbox",
            "label": "Life Insurance Policy Review",    
            "name": "life_insurance_policy_review",
            "options": [
                "Yes",
                "No"
            ],
            "required": true,
            "description": "Please select whether you have reviewed your life insurance policy"
        }
    ]
}'),
(5, 'Financial Documents Storage', 'Store digital copies of important financial documents in a secure location.',
'{
    "actions": [
        {
            "action_type": "input",
            "label": "Financial Documents Location",
            "placeholder": "Enter your financial documents",
            "name": "financial_documents_location", 
            "required": true,
            "description": "Please provide the location of your financial documents"
        }
    ]
}');

-- Creating test subtasks
INSERT INTO sub_tasks (task_id, sub_task_name, sub_task_description) VALUES
(1, 'Research Fear', 'Research books, articles, or podcasts on overcoming fear of death.'), 
(1, 'Connect With Support', 'Connect with a local support group for individuals facing similar fears.'),
(1, 'Manage Anxiety', 'Explore mindfulness or meditation practices to help manage anxiety related to end-of-life topics.'),
(7, 'Asset Distribution', 'Leverage draft specific clauses regarding asset distribution, including any conditional bequests.'),
(7, 'Minor Children', 'Designate a guardian for minor children and establish trusts for their care.'),
(7, 'Digital Assets', 'Include provisions for digital assets, such as passwords and access instructions.'),
(8, 'Family Members', 'Schedule individual meetings with family members to discuss your end-of-life plans.'),
(8, 'Financial Institutions', 'Provide your executor with a detailed list of your financial institutions, account numbers, and contact information.'),
(8, 'Important Document Location', 'Share the location of your important documents, such as your will and healthcare directives.'),
(9, 'Annual Reminder', 'Set up an automated annual reminder for financial plan reviews.'),
(9, 'Major Life Change Updates', 'Update your beneficiaries and estate plan whenever you experience significant life changes, such as marriage, divorce, or the birth of a child.'),
(9, 'Periodic Preference Reviews', 'Conduct periodic reviews of your funeral or memorial preferences and make adjustments as needed.'),
(10, 'Find Lawyer', 'Research and interview multiple trust and estate lawyers to find the most suitable one.'),
(10, 'Financial Planner', 'Hire a financial planner to create a detailed financial roadmap and investment strategy.'),
(10, 'Certified Public Accountant', 'Collaborate with a certified public accountant (CPA) to address tax planning and compliance.'),
(11, 'Comprehensive Trust Document', 'Consult with your trust and estate lawyer to draft a comprehensive trust document.'),
(11, 'Asset Inventory', 'Review and update your asset inventory to ensure all valuable assets are included in the trust.'),
(11, 'Backup Successor Trustees', 'Appoint backup successor trustees and provide them with necessary information.'),
(12, 'Tax Planning Calendar', 'Create a comprehensive tax planning calendar outlining important deadlines.'),
(12, 'Reducing Estate Tax Liability', 'Implement gifting strategies to reduce potential estate tax liability.'),
(12, 'Charitable Giving', 'Consult with a philanthropic advisor to structure charitable giving in a tax-efficient manner.'),
(15, 'Family Meetings', 'Schedule regular family meetings, including an annual retreat to discuss long-term objectives.'),
(13, 'Family Counseling', 'Work with a family therapist or counselor to facilitate constructive communication and conflict resolution strategies.'),
(13, 'Family Mission', 'Create a family mission statement or constitution outlining the family''s values, mission, and governance principles.'),
(14, 'Death Doula', 'Arrange meetings with a death doula and spiritual advisor to explore emotional and spiritual concerns.'),
(15, 'Life Story', 'Record your life story and personal anecdotes to pass on your legacy.'),
(15, 'Family Philanthropic Participation', 'Establish a process for family members to participate in philanthropic initiatives and maintain alignment with family values.');

-- Insert relationships into the persona_tasks junction table

-- Persona 1: Procrastinating Rookie
INSERT INTO persona_tasks (persona_id, task_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8);

-- Persona 2: Adventurous Optimist
INSERT INTO persona_tasks (persona_id, task_id) VALUES
(2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12), (2, 13), (2, 14), (2, 15);

-- Persona 3: Adventurous Optimist with Wealth
INSERT INTO persona_tasks (persona_id, task_id) VALUES
(3, 10), (3, 11), (3, 12), (3, 13), (3, 14), (3, 15);

-- Persona 4: Multitasking Dynamo
INSERT INTO persona_tasks (persona_id, task_id) VALUES
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10), (4, 11), (4, 12), (4, 13), (4, 14), (4, 15);

-- Persona 5: Tranquil Trailblazer
INSERT INTO persona_tasks (persona_id, task_id) VALUES
(5, 4), (5, 5), (5, 6), (5, 7), (5, 8), (5, 9), (5, 10), (5, 11), (5, 12), (5, 13), (5, 14), (5, 15);

-- Creating test guides
INSERT INTO guides (guide_name, title, sub_title, author, author_image_url, mins_read, date, full_text) VALUES
('Your Legacy', 'Preserving Your Legacy:', 'Practical Steps for Funeral Affordability', 'Barack Obama', 'https://images1.penguinrandomhouse.com/author/22627', 5, '2023-10-17T23:05:10.4895-04:00',
'In the grand symphony of life, there are few certainties. Among them, one stands out starkly: our time here is finite. Yet, it''s the inevitability of our final encore that many of us prefer not to dwell on. This is entirely human, but it''s a fact that can''t be brushed aside indefinitely. End-of-life planning, while often seen as daunting, can be transformed into an empowering process—a legacy of care and love for our loved ones.  
  
**The Price of Peace of Mind**
The mention of end-of-life planning often brings to mind wills, trusts, and the distribution of assets. While these are crucial aspects, there''s another vital component that deserves your attention: funeral planning. The cost of funeral services can be staggering, leaving families not just grieving but also grappling with unexpected financial burdens.  
In today''s world, the average cost of a funeral can easily reach several thousand dollars, making it one of life''s most substantial expenses. This reality prompts a critical question: How can we ensure a dignified farewell without burdening our loved ones?  
  
The Legacy Solution  
At Legacy, we understand the importance of preserving your legacy while also being mindful of the costs involved. Our mission is to empower you to take control of your end-of-life planning with joyous urgency. We believe that by confronting these realities and making thoughtful decisions today, you can grant your loved ones the gift of peace of mind tomorrow.  
  
Step 1: Explore Your Options  
The first step to achieving affordable funeral arrangements is to explore your options. Funeral costs can vary significantly based on factors such as location, type of service, and personal preferences. By researching local funeral homes and considering cremation or green burial alternatives, you can discover cost-effective choices without compromising on respect and reverence.  
  
Step 2: Pre-Planning with Legacy  
One of the most practical ways to ease the financial burden of your final arrangements is through pre-planning. Legacy offers an intuitive platform that enables you to pre-plan your funeral with ease. By making decisions in advance and securing funds for your funeral, you ensure that your wishes are honored while alleviating the financial stress on your loved ones.  
  
Step 3: Share Your Plan  
Transparency is key. Once you''ve made your end-of-life plans, communicate them with your family and loved ones. Sharing your wishes not only fosters understanding but also avoids any unexpected surprises when the time comes. It ensures that your choices are respected and followed, offering a sense of closure to your loved ones.  
  
Step 4: Seek Professional Guidance  
Navigating the intricacies of end-of-life planning can be overwhelming. That''s where our team at Legacy shines. We connect you with trusted professionals who can provide expert guidance on legal and financial matters. Our extensive network of attorneys, doulas, and funeral planning experts ensures that you have the support you need.  
  
Step 5: Embrace Peace of Mind  
With your end-of-life plans in place, you can embrace the present with newfound peace of mind. Legacy''s platform streamlines the process, making it accessible, affordable, and personal. By preserving your legacy today, you create a lasting memory of love, thoughtfulness, and consideration for those who matter most.  
  
In Conclusion  
Preserving your legacy is a journey of love and responsibility. It''s about ensuring that your final chapter is both a celebration of life and a testament to your care for those who will remember you. Legacy is your partner in this journey, offering expertise, affordability, and a deep commitment to making the end-of-life planning process as smooth as possible.  
As you reflect on your life''s journey, consider the importance of end-of-life planning. Embrace the joyful urgency of today, and gift your loved ones the solace of knowing your final wishes are honored.'),
('Writing Wills', 'Writing a will:', 'Ensuring your wishes are carried out', 'Hilary Clinton', 'https://m.media-amazon.com/images/M/MV5BNmQ1OTJhMzItNWIzOC00ZjdlLWEwNDgtODRiYjczNTkyZjc5XkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_FMjpg_UX1000_.jpg', 15, '2023-10-17T23:05:10.4895-04:00',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum justo sollicitudin tortor congue luctus. Suspendisse ultricies felis et quam bibendum rutrum. Vivamus porta tellus ligula, vel ullamcorper tellus pulvinar ut. Phasellus tempor eleifend ipsum vitae hendrerit. Vestibulum elementum euismod dapibus. Pellentesque faucibus orci a pulvinar pulvinar. Morbi viverra odio convallis mi commodo sodales. Maecenas aliquam velit diam, ut aliquam ante semper id.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum justo sollicitudin tortor congue luctus. Suspendisse ultricies felis et quam bibendum rutrum. Vivamus porta tellus ligula, vel ullamcorper tellus pulvinar ut. Phasellus tempor eleifend ipsum vitae hendrerit. Vestibulum elementum euismod dapibus. Pellentesque faucibus orci a pulvinar pulvinar. Morbi viverra odio convallis mi commodo sodales. Maecenas aliquam velit diam, ut aliquam ante semper id.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum justo sollicitudin tortor congue luctus. Suspendisse ultricies felis et quam bibendum rutrum. Vivamus porta tellus ligula, vel ullamcorper tellus pulvinar ut. Phasellus tempor eleifend ipsum vitae hendrerit. Vestibulum elementum euismod dapibus. Pellentesque faucibus orci a pulvinar pulvinar. Morbi viverra odio convallis mi commodo sodales. Maecenas aliquam velit diam, ut aliquam ante semper id.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum justo sollicitudin tortor congue luctus. Suspendisse ultricies felis et quam bibendum rutrum. Vivamus porta tellus ligula, vel ullamcorper tellus pulvinar ut. Phasellus tempor eleifend ipsum vitae hendrerit. Vestibulum elementum euismod dapibus. Pellentesque faucibus orci a pulvinar pulvinar. Morbi viverra odio convallis mi commodo sodales. Maecenas aliquam velit diam, ut aliquam ante semper idLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum justo sollicitudin tortor congue luctus. Suspendisse ultricies felis et quam bibendum rutrum. Vivamus porta tellus ligula, vel ullamcorper tellus pulvinar ut. Phasellus tempor eleifend ipsum vitae hendrerit. Vestibulum elementum euismod dapibus. Pellentesque faucibus orci a pulvinar pulvinar. Morbi viverra odio convallis mi commodo sodales. Maecenas aliquam velit diam, ut aliquam ante semper idLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum justo sollicitudin tortor congue luctus. Suspendisse ultricies felis et quam bibendum rutrum. Vivamus porta tellus ligula, vel ullamcorper tellus pulvinar ut. Phasellus tempor eleifend ipsum vitae hendrerit. Vestibulum elementum euismod dapibus. Pellentesque faucibus orci a pulvinar pulvinar. Morbi viverra odio convallis mi commodo sodales. Maecenas aliquam velit diam, ut aliquam ante semper id.'),
('Electronic Wills', 'The Benefits of Electronic Will Writing:', 'A Comprehensive Guide', 'Akshay Dupuguntla', 'https://media.licdn.com/dms/image/D4E03AQGpN8PB7pGUlg/profile-displayphoto-shrink_800_800/0/1694390002762?e=2147483647&v=beta&t=_jM-7ElsPpNEFFWQQa19VBwMjdjf0XdM3f-JCcX1oO0', 9, '2023-12-06T23:05:10.4895-04:00',
'**Introduction:**
Writing a will is a crucial step in ensuring that your assets are distributed according to your wishes after you pass away. Traditionally, wills were handwritten or typed on paper, but with advancements in technology, electronic will writing has become an increasingly popular and efficient option. In this guide, we will explore the numerous benefits of electronic will writing and why it is a good choice for modern individuals.

**Accessibility and Convenience:**
One of the primary advantages of electronic will writing is the ease of accessibility. Electronic wills can be created, stored, and accessed online, allowing individuals to update their wills conveniently from the comfort of their homes. This accessibility ensures that your will is always current and reflects your most recent intentions.

**Time and Cost Efficiency:**
Electronic will writing can significantly reduce the time and cost associated with the traditional will-making process. With online platforms and software, individuals can create a legally valid will in a relatively short amount of time, without the need for multiple appointments with legal professionals. This can be particularly advantageous for those with busy schedules or those looking to minimize legal expenses.

**Legal Validity:**
Many electronic will-writing platforms adhere to legal standards and regulations, ensuring that the resulting documents are legally valid. By using reputable online services, individuals can create wills that meet the legal requirements of their jurisdiction. It''s essential to choose a platform that complies with the necessary legal standards and provides guidance throughout the process.

**Flexibility and Customization:**
Electronic wills offer a high level of flexibility and customization. Online platforms often provide templates that can be tailored to suit individual needs. This flexibility allows individuals to include specific instructions regarding the distribution of assets, guardianship of minors, and other personalized details. The ability to customize the document ensures that your wishes are accurately reflected in your will.

**Secure Storage:**
Electronic wills can be securely stored in the cloud or on dedicated platforms, protecting them from physical damage, loss, or theft. This digital storage ensures that your will is easily accessible by designated individuals, such as executors or family members, while maintaining the confidentiality of the document during your lifetime.

**Easy Updates and Amendments:**
Life circumstances change, and it''s crucial to update your will accordingly. Electronic wills make the process of updating and amending documents straightforward. Whether you experience a change in financial status, family structure, or other significant life events, electronic platforms typically allow users to make revisions easily and ensure that their wills remain current.

**Conclusion:**
In conclusion, electronic will writing offers a range of benefits that cater to the needs of modern individuals. From accessibility and cost efficiency to legal validity and easy updates, electronic wills provide a streamlined and secure way to plan for the future. As technology continues to advance, embracing electronic will writing can be a prudent choice for those seeking a convenient and effective means of safeguarding their assets and ensuring their wishes are fulfilled.'),
('Lorem Ipsum', 'Lorem Ipsum Dolor:', 'sit amet consectetur adipiscing elit', 'Greta Thunberg', 'https://media.npr.org/assets/img/2019/09/23/greta-thunberg-6885688c48a13abb7172110ca7d032b562589699-s1600-c85.webp', 3, '2023-10-17T23:05:10.4895-04:00',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum justo sollicitudin tortor congue luctus. Suspendisse ultricies felis et quam bibendum rutrum. Vivamus porta tellus ligula, vel ullamcorper tellus pulvinar ut. Phasellus tempor eleifend ipsum vitae hendrerit. Vestibulum elementum euismod dapibus. Pellentesque faucibus orci a pulvinar pulvinar. Morbi viverra odio convallis mi commodo sodales. Maecenas aliquam velit diam, ut aliquam ante semper id.

**Lorem ipsum dolor sit amet**
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum justo sollicitudin tortor congue luctus. Suspendisse ultricies felis et quam bibendum rutrum. Vivamus porta tellus ligula, vel ullamcorper tellus pulvinar ut. Phasellus tempor eleifend ipsum vitae hendrerit. Vestibulum elementum euismod dapibus. Pellentesque faucibus orci a pulvinar pulvinar. Morbi viverra odio convallis mi commodo sodales. Maecenas aliquam velit diam, ut aliquam ante semper id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum justo sollicitudin tortor congue luctus. Suspendisse ultricies felis et quam bibendum rutrum. Vivamus porta tellus ligula, vel ullamcorper tellus pulvinar ut. Phasellus tempor eleifend ipsum vitae hendrerit. Vestibulum elementum euismod dapibus. Pellentesque faucibus orci a pulvinar pulvinar. Morbi viverra odio convallis mi commodo sodales. Maecenas aliquam velit diam, ut aliquam ante semper id.');

-- Linking tags to guides
INSERT INTO guide_tags (guide_id, tag_id) VALUES
(1, 1), (1, 2), (1, 3), (2, 1), (2, 2), (2, 3), (2, 4), (3, 1), (3, 3), (3, 4), (4, 1), (4, 2);

-- Creating test files

-- Creating test file_tags
INSERT INTO file_tags (file_id, tag_id) VALUES
(1, 1), (2, 2);