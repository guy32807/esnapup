export interface Specialization {
  id: string;
  title: string;
  description: string;
  image: string;
  benefits: string[];
  technologies: string[];
}

export const specializations: Specialization[] = [
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'End-to-end web and mobile application development with modern frameworks and best practices for scalable, maintainable code.',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Seamless integration between frontend and backend',
      'Consistent user experience across platforms',
      'Clean, maintainable, and well-documented code',
      'Performance optimization for fast load times',
      'Responsive design for all device sizes'
    ],
    technologies: [
      'Frontend: React, Angular, Vue.js, TypeScript',
      'Backend: Node.js, Express, Python, Django, Flask, Java Spring, C#, .NET Core',
      'Mobile: React Native, Flutter, Swift (iOS), Kotlin (Android)',
      'Database: MongoDB, PostgreSQL, SQL Server, Azure Cosmos DB',
      'ORM: Mongoose, Sequelize, SQLAlchemy, Django ORM, Entity Framework, Hibernate'
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'Creation of native and cross-platform mobile applications for iOS and Android with a focus on performance, user experience and platform-specific design guidelines.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Native performance and platform-specific features',
      'Intuitive user interfaces following platform guidelines',
      'Offline capabilities and data synchronization',
      'Integration with device features (camera, GPS, etc.)',
      'App store optimization and deployment'
    ],
    technologies: [
      'Native iOS: Swift, SwiftUI, UIKit',
      'Native Android: Kotlin, Jetpack Compose',
      'Cross-platform: React Native, Flutter',
      'State Management: Redux, MobX, Provider',
      'Backend Integration: RESTful APIs, GraphQL'
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Creation of intuitive, responsive user interfaces with modern JavaScript frameworks and UI/UX best practices.',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Intuitive and engaging user interfaces',
      'Responsive designs that work on all devices',
      'Optimized performance and loading speeds',
      'Accessibility compliance (WCAG)',
      'Clean, maintainable component architecture'
    ],
    technologies: [
      'React, Next.js, Redux, Context API',
      'Angular, RxJS, NgRx',
      'TypeScript, JavaScript (ES6+)',
      'HTML5, CSS3, Sass/SCSS',
      'Material UI, Bootstrap, Tailwind CSS'
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Development of robust, scalable server-side applications and APIs that power your business logic and data processing needs.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Secure and efficient API design',
      'Robust data validation and error handling',
      'Optimized database queries and performance',
      'Scalable architecture for growing applications',
      'Comprehensive testing and documentation'
    ],
    technologies: [
      'Node.js, Express, NestJS',
      'Python, Django, Flask, FastAPI',
      'Java, Spring Boot, Spring MVC, Spring Cloud',
      'C#, .NET Core, ASP.NET',
      'MongoDB, PostgreSQL, MySQL, SQL Server, Azure Cosmos DB',
      'ORM: Sequelize, Mongoose, SQLAlchemy, Django ORM, Entity Framework, Hibernate/JPA'
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud Architecture & DevOps',
    description: 'Design and implementation of scalable, secure, and cost-effective cloud infrastructure with automated CI/CD pipelines.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Scalable infrastructure that grows with your business',
      'Automated deployment pipelines for faster releases',
      'Cost optimization and resource management',
      'Improved system reliability and uptime',
      'Security best practices implementation'
    ],
    technologies: [
      'AWS (EC2, S3, Lambda, CloudFormation)',
      'Azure (App Service, Functions, DevOps, Cosmos DB)',
      'Google Cloud (GCE, GKE, Cloud Functions)',
      'Docker, Kubernetes, Terraform',
      'Jenkins, GitHub Actions, GitLab CI/CD'
    ]
  },
  {
    id: 'database',
    title: 'Database Design & Optimization',
    description: 'Design, implementation, and optimization of database systems for efficient data storage, retrieval, and management.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Efficient data models tailored to your needs',
      'Optimized query performance',
      'Data integrity and security',
      'Scalable database architecture',
      'Migration and upgrade paths'
    ],
    technologies: [
      'Relational: PostgreSQL, MySQL, SQL Server',
      'NoSQL: MongoDB, DynamoDB, Azure Cosmos DB, Cassandra',
      'Cloud Databases: Azure Cosmos DB, Amazon Aurora, Google Cloud Spanner',
      'Caching: Redis, Memcached',
      'ORM: Sequelize, Mongoose, SQLAlchemy, Django ORM, Entity Framework'
    ]
  },
  {
    id: 'ai-integration',
    title: 'AI & Generative AI',
    description: 'Integration of cutting-edge AI technologies to create intelligent applications that transform business processes, enhance customer experiences, and unlock new possibilities through machine learning and natural language processing.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Automate routine tasks and workflows',
      'Extract insights from unstructured data',
      'Create personalized user experiences',
      'Enhance decision-making with AI-powered analytics',
      'Develop intelligent assistants and chatbots'
    ],
    technologies: [
      'Large Language Models (LLMs): OpenAI GPT-4, Anthropic Claude, Llama',
      'Frontend Frameworks: Next.js, React, Vue.js',
      'AI Frameworks: LangChain, LlamaIndex, Semantic Kernel',
      'Retrieval Augmented Generation (RAG) Architecture',
      'Vector Databases: Pinecone, Weaviate, Chroma',
      'AI/ML: TensorFlow, PyTorch, Hugging Face Transformers',
      'Cloud AI Services: Azure OpenAI Service, AWS Bedrock, Google Vertex AI'
    ]
  },
  {
    id: 'ml-data',
    title: 'Machine Learning & Data Solutions',
    description: 'Development of data-driven applications and machine learning solutions that transform raw data into actionable insights and intelligent systems that adapt and improve over time.',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Turn business data into predictive insights',
      'Build recommendation systems that drive engagement',
      'Develop computer vision solutions for image analysis',
      'Create natural language processing pipelines',
      'Deploy and monitor ML models in production'
    ],
    technologies: [
      'Data Processing: Python, Pandas, NumPy, Spark',
      'ML Frameworks: TensorFlow, PyTorch, scikit-learn',
      'NLP: Hugging Face Transformers, spaCy, NLTK',
      'Computer Vision: OpenCV, TensorFlow Vision',
      'MLOps: MLflow, Kubeflow, TensorFlow Serving',
      'Data Visualization: Tableau, Power BI, D3.js'
    ]
  }
];