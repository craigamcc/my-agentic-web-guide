import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Cpu, Share2, Puzzle, Lightbulb, CheckCircle, XCircle, Code, Copy, ArrowRight, Home, Menu, X, TrendingUp, Search, Mic, Clapperboard, MessageSquare, Send, ShieldAlert, DollarSign, Target, Link, Bot, RefreshCw, Server, Database, BrainCircuit, Cloud, HardDrive, CheckSquare, User, DatabaseZap, PlusCircle, Sparkles, Globe, PenSquare, LayoutList, Wrench } from 'lucide-react';

// --- Reusable Components ---

const Tooltip = ({ text, children }) => (
  <span className="group relative">
    <span className="underline decoration-dotted decoration-indigo-300 cursor-help">{children}</span>
    <span className="absolute bottom-full mb-2 w-72 bg-gray-800 text-white text-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 shadow-lg">
      {text}
    </span>
  </span>
);

const CodeBlock = ({ children, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const textToCopy = children.props.children;
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="bg-slate-900 rounded-lg my-4 overflow-hidden shadow-2xl border border-slate-700">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-800 text-slate-400 text-xs">
        <span className="font-mono">{language}</span>
        <button onClick={handleCopy} className="flex items-center space-x-1.5 text-slate-400 hover:text-white transition-colors focus:outline-none">
          {copied ? <CheckCircle size={16} className="text-green-400" /> : <Copy size={16} />}
          <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 text-sm text-white overflow-x-auto"><code>{children}</code></pre>
    </div>
  );
};

const Card = ({ icon, title, children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 border border-slate-200 ${className}`}>
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold text-slate-800 ml-4">{title}</h3>
      </div>
      <div className="text-slate-600 space-y-3">{children}</div>
    </div>
  </div>
);

const Tab = ({ label, activeTab, setActiveTab, icon }) => (
  <button
    onClick={() => setActiveTab(label)}
    className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none flex-shrink-0 ${
      activeTab === label
        ? 'border-b-2 border-indigo-500 text-indigo-600 bg-indigo-50'
        : 'text-slate-500 hover:text-indigo-500 hover:bg-slate-100'
    }`}
  >
    {icon} {label}
  </button>
);

// --- Page Components ---

const PageWrapper = ({ children }) => (
    <div className="animate-fadeIn">{children}</div>
);

const HomePage = ({ setPage }) => (
  <PageWrapper>
    <div className="text-center">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl shadow-2xl p-8 md:p-12 mb-10">
          <Globe size={64} className="mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">The Publisher's Guide to the Agentic Web</h1>
          <p className="text-lg md:text-xl text-indigo-200 max-w-3xl mx-auto">
              Learn how to transform your site from a static collection of pages into an intelligent, conversational application for the new era of AI.
          </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 text-left">
        <Card icon={<Lightbulb size={24} />} title="The Strategic 'Why'">
          <p>
            The rise of AI assistants is changing how users find information. Understand the challenges and opportunities this presents for publishers and why a proactive strategy is essential for the future.
          </p>
          <button onClick={() => setPage('Why')} className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center group">
            Explore the Vision <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </Card>
        <Card icon={<Code size={24} />} title="The Technical 'How'">
          <p>
            Dive into the practical steps for implementing a conversational AI layer. This guide covers everything from structuring your data to deploying the necessary infrastructure and managing your content lifecycle.
          </p>
          <button onClick={() => setPage('Implementation')} className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center group">
            Start the Playbook <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </Card>
      </div>
       <div className="mt-8">
          <Card icon={<MessageSquare size={24} />} title="Try the Live Demo!">
              <p>The best way to understand the potential is to see it in action. Jump into our live simulation to experience how a website can respond to natural language questions, backed by its own content.</p>
              <button onClick={() => setPage('Demo')} className="mt-4 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                  Launch Live Demo
              </button>
          </Card>
      </div>
    </div>
  </PageWrapper>
);

const WhyPage = () => (
    <PageWrapper>
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">The Publisher's Dilemma in the AI Era</h2>
        <div className="grid lg:grid-cols-1 gap-8">
            <Card icon={<XCircle size={32} className="text-red-500" />} title="The Problem: Becoming Invisible">
                <p>AI assistants and search engines now synthesize information directly, often bypassing your website. This threatens traffic, revenue, and attribution.</p>
                <p>Blocking AI crawlers is a defensive, short-term fix. It means opting out of the new AI ecosystem, not participating on your own terms.</p>
            </Card>
            <Card icon={<CheckCircle size={32} className="text-green-500" />} title="A New Approach: Proactive Strategy">
                <p>Frameworks like NLWeb demonstrate a new strategy: transforming a site from a passive collection of pages into an active, queryable data source that can "speak for itself." Leading publishers like *The Washington Post* and the *Financial Times* are already experimenting with their own conversational AI tools.</p>
                <p>This approach allows a publisher to retain control over their conversational layer: they choose the LLM, the vector database, the data to expose, and the logic for responses.</p>
            </Card>
             <Card icon={<Globe size={32} className="text-indigo-500" />} title="The Opportunity: The Agentic Web">
                <p>Microsoft CTO Kevin Scott envisions a new "agentic web" where AI agents act on behalf of users. NLWeb and MCP are presented as foundational protocols for this new web.</p>
                <p className="italic border-l-4 border-slate-200 pl-4">"If you had a real complete agentic web where MCP was sort of the lingua franca... you're going to see this really interesting organic unfolding of what's possible." - Kevin Scott</p>
                <p>This isn't just about better search; it's about turning your website into a tool that AI agents can use, creating new opportunities for engagement and monetization.</p>
            </Card>
        </div>
    </PageWrapper>
);

const ArchitecturePage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        { icon: <User size={32} />, title: '1. Decontextualize', description: "The system analyzes the user's query in the context of the conversation history. For example, if the user asks 'who was the keynote speaker?', it understands this refers to the previously discussed 'Innovate Summit'." },
        { icon: <Wrench size={32} />, title: '2. Tool Selection', description: "Based on the decontextualized query, the system selects the most appropriate tool. A query like 'summarize this' would select the RAG tool, while 'who is...' would select the Item Details tool." },
        { icon: <DatabaseZap size={32} />, title: '3. Retrieve', description: "The selected tool executes its logic, which typically involves converting the query to a vector and performing a semantic search on the vector database to find the most relevant content from your site." },
        { icon: <Sparkles size={32} />, title: '4. Generate', description: "The retrieved content is combined with the original query into a detailed, context-rich prompt. This is sent to an LLM to generate a final, human-readable answer, complete with source citations." }
    ];
    const coreComponents = [
        {title: 'Core Engine', text: 'Orchestrates the entire query lifecycle.'}, {title: 'LLM Provider', text: 'Pluggable interface to connect to your chosen LLM.'}, {title: 'Vector DB Client', text: 'Connects to a vector database for semantic search.'}, {title: 'Embedding Provider', text: 'Converts text into numerical vectors.'}, {title: 'Data Ingestion Tools', text: 'Scripts to process your source data (e.g., RSS).'}, {title: 'REST/JSON Protocol', text: 'Defines the `/api/ask` endpoint for communication.'}
    ];

    useEffect(() => {
        const interval = setInterval(() => setActiveStep(prev => (prev + 1) % steps.length), 4000);
        return () => clearInterval(interval);
    }, [steps.length]);

    return (
        <PageWrapper>
            <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Architectural Blueprint</h2>
            <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">Conversational AI frameworks like NLWeb are modular. You can plug and play components to fit your existing tech stack.</p>
            
            <div className="mt-12">
                <h3 className="text-xl font-bold mb-8 text-center">The Life of a Chat Query (RAG in Action)</h3>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.title}>
                            <div className="flex flex-col items-center text-center cursor-pointer group" onMouseEnter={() => setActiveStep(index)}>
                                <div className={`p-4 rounded-full transition-all duration-300 ${activeStep === index ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-200 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>
                                    {step.icon}
                                </div>
                                <h4 className={`font-bold mt-3 transition-colors ${activeStep === index ? 'text-indigo-600' : 'text-slate-700'}`}>{step.title}</h4>
                            </div>
                            {index < steps.length - 1 && <div className={`w-full md:w-24 h-1 md:h-auto mx-4 my-2 md:my-0 rounded-full transition-colors duration-300 ${activeStep > index ? 'bg-indigo-500' : 'bg-slate-200'}`}></div>}
                        </React.Fragment>
                    ))}
                </div>
                <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border text-center min-h-[100px] flex items-center justify-center">
                    <p className="text-slate-700 max-w-2xl mx-auto">{steps[activeStep].description}</p>
                </div>
                 <p className="text-center text-sm text-slate-500 mt-4">This process is a form of <Tooltip text="Retrieval-Augmented Generation: A technique that grounds LLM answers in specific, retrieved data to improve accuracy and reduce hallucinations.">RAG</Tooltip>, but one that is specifically optimized for a publisher's structured website data.</p>
            </div>

            <div className="mt-16">
                <h3 className="text-xl font-bold mb-6 text-center">Core Components</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coreComponents.map(item => (
                        <div key={item.title} className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all">
                            <h4 className="font-bold text-indigo-800">{item.title}</h4>
                            <p className="text-sm text-slate-600 mt-1">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
};

const MCPPage = () => (
    <PageWrapper>
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">MCP: The Gateway to the Agentic Web</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">The Model Context Protocol (MCP) is a key standard for the agentic web. Kevin Scott calls it the <span className="font-bold text-indigo-600">"moral equivalent of HTTP for the agentic web."</span></p>

        <div className="bg-white p-8 rounded-lg shadow-xl border border-slate-200">
            <h3 className="text-xl font-bold mb-6 text-center">The Communication Flow</h3>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
                
                <div className="text-center flex flex-col items-center group w-full md:w-1/3">
                    <div className="bg-slate-100 p-4 rounded-full border-2 border-dashed border-slate-300 group-hover:border-indigo-400 transition-colors">
                        <Bot size={40} className="text-slate-500 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <h4 className="font-bold mt-4">1. AI Agent (MCP Host)</h4>
                    <p className="text-sm text-slate-500 mt-1">An external AI agent needs information and sends a standardized request.</p>
                </div>
                
                <div className="flex-1 flex flex-col items-center w-full md:w-auto">
                     <div className="font-mono text-sm text-indigo-600 mb-1">MCP</div>
                    <div className="w-full h-1 bg-slate-200 rounded-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 w-1/2 animate-flow"></div>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">JSON-RPC over HTTP</div>
                </div>

                <div className="text-center flex flex-col items-center group w-full md:w-1/3">
                    <div className="bg-indigo-100 p-4 rounded-full border-2 border-dashed border-indigo-300 group-hover:border-indigo-500 transition-colors">
                        <Share2 size={40} className="text-indigo-500 group-hover:text-indigo-700 transition-colors" />
                    </div>
                    <h4 className="font-bold mt-4">2. Your Site (MCP Server)</h4>
                    <p className="text-sm text-slate-500 mt-1">Your NLWeb instance receives the request, finds answers, and sends a structured response.</p>
                </div>

            </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-xl font-bold mb-4 text-center">Example MCP Request</h3>
                <p className="text-center text-sm text-slate-500 mb-4">The AI agent sends a simple JSON-RPC request to your server's `/api/ask` endpoint:</p>
                <CodeBlock language="json">{`{
  "jsonrpc": "2.0",
  "method": "ask",
  "params": {
    "query": "What was announced at the Innovate Summit in Geneva?"
  },
  "id": "12345"
}`}</CodeBlock>
            </div>
            <div>
                <h3 className="text-xl font-bold mb-4 text-center">Example MCP Response from NLWeb</h3>
                <p className="text-center text-sm text-slate-500 mb-4">Your NLWeb server replies with the answer and, crucially, the sources it used:</p>
                <CodeBlock language="json">{`{
  "jsonrpc": "2.0",
  "result": {
    "content": "The Innovate Summit 2025 featured the announcement of 'Project Chimera,' a new open-source AI model for drug discovery.",
    "references": [
      {
        "@type": "NewsArticle",
        "headline": "Innovate Summit 2025 Highlights AI Breakthroughs",
        "url": "https://your-news-site.com/article/123"
      }
    ]
  },
  "id": "12345"
}`}</CodeBlock>
            </div>
        </div>

        <div className="mt-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h3 className="font-bold text-red-800 flex items-center"><ShieldAlert className="mr-2"/>A Sobering Note on Security</h3>
            <p className="text-red-700 mt-2">Opening your site as a programmable server introduces novel and significant security challenges. The very openness that makes NLWeb and MCP so powerful is also its primary vulnerability.</p>
        </div>
        <style>{`
            @keyframes flow {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
            }
            .animate-flow {
                animation: flow 2.5s linear infinite;
            }
        `}</style>
    </PageWrapper>
);

const BigPicturePage = () => (
    <PageWrapper>
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">The Big Picture: A New Web</h2>
        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-12">While the agentic web is a widely discussed future, there are competing visions for how it will be built. It's important to understand these different philosophies.</p>
        <div className="space-y-8">
            <Card icon={<Globe size={24} />} title="The Rise of the 'Agentic Web'">
                <p>The next evolution of the web will be defined by AI "agents" that perform complex tasks for users. Instead of just browsing pages, users will direct their agents to research topics, compare products, and transact business.</p>
                <p className="mt-2">Frameworks like NLWeb and open protocols like MCP provide the essential plumbing for your website to become a valuable resource for these agents.</p>
            </Card>
            <Card icon={<CheckSquare size={24} />} title="Creator Agency and New Business Models">
                <p>A key goal of this new ecosystem is to give "agency" back to content creators. Open protocols allow you to control what content is accessible to AI agents and how it's monetized. One powerful model involves the user's agent leveraging their existing subscriptions.</p>
                <p className="italic border-l-4 border-slate-200 pl-4 mt-2">"If you have something like NL Web and a subscription to a bunch of news outlets, you can provide the agent access to those subscriptions if the publisher wants to allow that using the User's authorization tokens and then let the model reason over that information." - Kevin Scott</p>
                <p className="mt-2">This creates a direct value loop: users pay for high-quality content, and their AI agents can use that content on their behalf, respecting the subscription.</p>
            </Card>
            <Card icon={<Lightbulb size={24} />} title="Permissionless Innovation">
                <p>Scott compares this moment to the early days of the internet, where open protocols like HTTP allowed for an "organic unfolding of what's possible."</p>
                <p className="mt-2">By adopting open standards, you position your site to be part of this new wave of innovation, where you don't have to "ask anyone's permission to go try something wild."</p>
            </Card>
             <Card icon={<PenSquare size={24} />} title="Amplifying Authoritative Voices">
                <p>In a world saturated with AI-generated content, the value of unique, human-created, and authoritative sources increases. Users and their agents will actively seek out trusted brands.</p>
                <p className="italic border-l-4 border-slate-200 pl-4 mt-2">"I would love for it to be the case that AI made it easier for people like J.J. Abrams to do more of what they do... that's what people will want. They'll want more of the, you know, 'Hey, I am a fan of J.J. Abrams and his voice and his work, like, give me more of that.'" - Kevin Scott</p>
            </Card>
        </div>
    </PageWrapper>
);

const KeyFeaturesPage = () => (
    <PageWrapper>
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Key Features & Operational Modes</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">NLWeb is a flexible framework, not a one-size-fits-all product. It allows a publisher to choose how to mediate the relationship between their content and their audience by offering three distinct operational modes out of the box.</p>
        <div className="grid md:grid-cols-3 gap-8">
            <Card icon={<LayoutList size={24}/>} title="The Librarian: Enhanced Retrieval">
                <p>This mode provides a sophisticated version of traditional search. It returns a ranked list of articles, but enhances each result with a relevance score and an AI-generated explanation for why it's a good match.</p>
                <p className="font-semibold text-indigo-700 mt-2">Best for:</p>
                <p className="text-sm">Users who want to browse the best source material for their research.</p>
            </Card>
            <Card icon={<MessageSquare size={24}/>} title="The Expert: Direct Answer (RAG)">
                <p>For users who prefer a direct answer to a question, this mode synthesizes information from multiple articles to provide a single, conversational response, complete with source citations.</p>
                <p className="font-semibold text-indigo-700 mt-2">Best for:</p>
                <p className="text-sm">Quickly answering specific questions and enabling multi-turn conversational follow-ups.</p>
            </Card>
            <Card icon={<PenSquare size={24}/>} title="The Curator: Hybrid Summary">
                <p>This mode offers the best of both worlds. It presents an AI-generated summary of the key takeaways at the top, followed by a ranked list of the most relevant source articles for deeper exploration.</p>
                <p className="font-semibold text-indigo-700 mt-2">Best for:</p>
                <p className="text-sm">Giving users a quick cognitive offload (the "gist") while still providing easy access to the underlying sources.</p>
            </Card>
        </div>
         <div className="grid md:grid-cols-2 gap-8 mt-8">
            <Card icon={<Wrench size={24}/>} title="Tool-Based Architecture">
                <p>NLWeb uses different "tools" for different tasks. It can intelligently select a `Search Tool` for broad queries, an `Item Details Tool` for specific questions about one piece of content, or an `Ensemble Queries Tool` to combine different types of results.</p>
            </Card>
            <Card icon={<RefreshCw size={24}/>} title="Performance Optimized">
                <p>To keep costs low and responses fast, NLWeb uses a "fast track" path for simple queries and relies on small, efficient models like GPT-4o-mini for many of its internal processing steps, ensuring an affordable and high-quality experience at scale.</p>
            </Card>
        </div>
    </PageWrapper>
);

const UseCasesPage = () => (
    <PageWrapper>
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Use Cases & The Monetization Horizon</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">Preparing for the agentic web means anticipating how users and their AI agents will want to interact with your content. This is not just a defensive move; it's a platform for innovation.</p>
        <div className="space-y-8">
            <Card icon={<Search size={24}/>} title="Audience Use Case: Summarization & Explanation">
                <p>Users will task their agents to provide quick, concise summaries of complex topics, often without clicking through to the original article.</p>
                <p className="font-semibold text-indigo-700 mt-2">Example Queries:</p>
                <ul className="text-sm italic list-disc list-inside">
                    <li>"Summarize the latest developments on the economic reform bill."</li>
                    <li>"What’s the difference between a hurricane and a tornado?"</li>
                </ul>
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-bold text-indigo-800 text-sm">How Publishers Can Prepare:</h4>
                    <p className="text-sm text-indigo-700">Structure content with clear headings, summaries, and Schema.org markup to help agents accurately synthesize information while retaining attribution.</p>
                </div>
            </Card>
            <Card icon={<MessageSquare size={24}/>} title="Audience Use Case: Deep Conversational Q&A">
                <p>Users will engage in multi-turn dialogues to explore topics in depth, asking follow-up questions to build a comprehensive understanding.</p>
                <p className="font-semibold text-indigo-700 mt-2">Example Queries:</p>
                <ul className="text-sm italic list-disc list-inside">
                    <li>"What's going on with the Supreme Court?" followed by "What are the implications of that decision?"</li>
                    <li>"Tell me more about that prison in El Salvador."</li>
                </ul>
                 <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-bold text-indigo-800 text-sm">How Publishers Can Prepare:</h4>
                    <p className="text-sm text-indigo-700">Develop proprietary conversational tools trained on your own archives. This makes your entire content library an interactive knowledge base.</p>
                </div>
            </Card>
            <Card icon={<User size={24}/>} title="Audience Use Case: Personalized Briefings">
                <p>Agents will be tasked with creating highly personalized news feeds and briefings tailored to a user's specific interests, location, and even reading level.</p>
                <p className="font-semibold text-indigo-700 mt-2">Example Queries:</p>
                <ul className="text-sm italic list-disc list-inside">
                    <li>"Create a news briefing for me about technology and local sports."</li>
                    <li>"Adapt this article about quantum physics to a simpler reading level."</li>
                </ul>
                 <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-bold text-indigo-800 text-sm">How Publishers Can Prepare:</h4>
                    <p className="text-sm text-indigo-700">Ensure your content is adaptable by providing rich metadata and considering different formats (text, audio, video) that an agent can re-mix.</p>
                </div>
            </Card>
             <Card icon={<Lock size={24}/>} title="Internal Use Case: Newsroom Asset">
                <p>NLWeb can be used to create a secure, searchable archive of a newsroom's own reporting or sensitive documents from an investigation (e.g., police reports, lobbying disclosures). This allows journalists to find historical context and connections quickly.</p>
                 <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-bold text-indigo-800 text-sm">Key Advantages:</h4>
                    <p className="text-sm text-indigo-700">**Privacy:** Can be connected to a locally-run LLM to ensure sensitive documents are never sent to an external provider. **Verifiability:** Every result is tied back to a source document, reducing the risk of AI "hallucinations."</p>
                </div>
            </Card>
        </div>
    </PageWrapper>
);

const StrategyPage = () => (
    <PageWrapper>
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Strategy & Risks</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">A successful deployment is a strategic commitment, not just a technical one. Consider these critical factors.</p>
        <div className="grid lg:grid-cols-2 gap-8">
             <Card icon={<Share2 size={24} />} title="Competing Visions: Protocol vs. Browser Agents">
                <p>The agentic web is not a settled future. There are competing philosophies on how it will be built. The MCP/NLWeb approach relies on websites adopting an open protocol.</p>
                <p className="italic border-l-4 border-slate-200 pl-4 mt-2">"If you commit entirely to the MCP vision, you require these third-party MCP servers to work reliably... On the other hand, if you just... design it as the way a human would use that website, you have full control." - Aravind Srinivas, CEO of Perplexity</p>
                <p className="mt-2">This highlights a key strategic choice: invest in open protocols or wait for browser-based agents that can navigate existing websites without special integration.</p>
            </Card>
            <Card icon={<DollarSign size={24} />} title="Cost & Performance">
                <p>API calls for embedding and querying incur costs that scale with your content volume and user traffic. These must be carefully modeled.</p>
                <p>The RAG process introduces latency. For a good user experience, consider caching strategies or using smaller, faster models for certain queries.</p>
            </Card>
            <Card icon={<ShieldAlert size={24} />} title="Protocol & Security Risks">
                <p>The success of the agentic web depends on broad adoption of protocols like MCP. Early adopters face the risk that standards may evolve.</p>
                <p>Exposing an API also creates new security vectors like <Tooltip text="Cross-Prompt Injection Attack: Malicious data designed to trick a visiting AI agent into performing harmful actions.">XPIA</Tooltip>, requiring robust monitoring and access controls.</p>
            </Card>
            <Card icon={<CheckCircle size={24} />} title="The Primacy of Data Discipline">
                <p>The quality of your conversational AI is a direct reflection of the quality of your structured data. This cannot be overstated.</p>
                <p>Treating Schema.org markup and content transcripts as first-class editorial products is the single most important factor for success.</p>
            </Card>
        </div>
    </PageWrapper>
);

const InfrastructurePage = () => (
    <PageWrapper>
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Infrastructure Choices for Production</h2>
        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-12">Running a conversational AI system at scale requires making key decisions about your infrastructure. The system is composed of four main components that work together.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card icon={<Server size={32} />} title="1. Application Server">
                <p>This is where the main NLWeb Python application runs. It's the brain that handles requests and orchestrates all other services.</p>
                <div className="mt-4">
                    <h4 className="font-bold text-slate-700">Key Decision:</h4>
                    <p className="text-sm">Where will you host the application?</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center"><HardDrive size={16} className="mr-2 text-slate-500"/> Local Machine (for testing)</div>
                        <div className="flex items-center"><Cloud size={16} className="mr-2 text-indigo-500"/> Cloud Server (for production)</div>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-bold text-indigo-800 text-sm">Recommendation for News Sites:</h4>
                    <p className="text-sm text-indigo-700">Use a scalable cloud server (e.g., AWS EC2, Google Compute Engine, Azure VM) to handle variable traffic and ensure high availability.</p>
                </div>
            </Card>

            <Card icon={<Database size={32} />} title="2. Vector Database">
                <p>This specialized database stores your content as numerical vectors, enabling fast, meaning-based (semantic) search.</p>
                <div className="mt-4">
                    <h4 className="font-bold text-slate-700">Key Decision:</h4>
                    <p className="text-sm">Will you manage the database yourself or use a cloud service?</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center"><HardDrive size={16} className="mr-2 text-slate-500"/> Self-Hosted (e.g., Qdrant via Docker)</div>
                        <div className="flex items-center"><Cloud size={16} className="mr-2 text-indigo-500"/> Managed Service (e.g., Qdrant Cloud, Pinecone)</div>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-bold text-indigo-800 text-sm">Recommendation for News Sites:</h4>
                    <p className="text-sm text-indigo-700">A managed cloud service is highly recommended to ensure reliability, easy scaling, and to reduce operational overhead.</p>
                </div>
            </Card>

            <Card icon={<BrainCircuit size={32} />} title="3. Large Language Model (LLM)">
                <p>This is the AI model that generates the final, human-readable answers based on the content retrieved from your site.</p>
                <div className="mt-4">
                    <h4 className="font-bold text-slate-700">Key Decision:</h4>
                    <p className="text-sm">Which external API service will you use?</p>
                     <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center"><Cloud size={16} className="mr-2 text-indigo-500"/> API Service (OpenAI, Google, Anthropic)</div>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-bold text-indigo-800 text-sm">Recommendation for News Sites:</h4>
                    <p className="text-sm text-indigo-700">Choose a provider based on a balance of cost, speed, and response quality. Start with a popular, well-supported model like those from OpenAI or Google.</p>
                </div>
            </Card>

            <Card icon={<Cpu size={32} />} title="4. Embedding Model">
                <p>This AI model converts your text content into the numerical vectors that are stored in the vector database.</p>
                <div className="mt-4">
                    <h4 className="font-bold text-slate-700">Key Decision:</h4>
                    <p className="text-sm">Will you use your LLM provider's model or a specialized one?</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center"><Cloud size={16} className="mr-2 text-indigo-500"/> LLM Provider's Model (e.g., OpenAI)</div>
                        <div className="flex items-center"><Cloud size={16} className="mr-2 text-indigo-500"/> Specialized Service (e.g., Voyage AI)</div>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-bold text-indigo-800 text-sm">Recommendation for News Sites:</h4>
                    <p className="text-sm text-indigo-700">For simplicity and compatibility, start by using the embedding models offered by your chosen LLM provider.</p>
                </div>
            </Card>
        </div>
    </PageWrapper>
);

const ImplementationPage = () => {
    const [activeTab, setActiveTab] = useState('NewsArticle');
    const schemas = {
        NewsArticle: { type: 'NewsArticle', essential: ['headline', 'articleBody', 'datePublished', 'author'], pro: ['about (topics)', 'dateline', 'articleSection', 'speakable'], icon: <Search size={20} className="mr-2"/>, code: `{\n  "@context": "https://schema.org",\n  "@type": "NewsArticle",\n  "headline": "NLWeb Changes the Game for Publishers",\n  "datePublished": "2024-10-26",\n  "author": [{"@type": "Person", "name": "Jane Doe"}],\n  "articleBody": "The release of NLWeb by Microsoft provides a new framework...",\n  "about": ["AI", "Publishing", "Technology"]\n}` },
        VideoObject: { type: 'VideoObject', essential: ['name', 'description', 'thumbnailUrl', 'uploadDate', 'duration'], pro: ['transcript (CRITICAL)', 'hasPart (Clips)', 'director'], icon: <Clapperboard size={20} className="mr-2"/>, code: `{\n  "@context": "https://schema.org",\n  "@type": "VideoObject",\n  "name": "NLWeb Implementation Tutorial",\n  "uploadDate": "2024-11-15",\n  "duration": "PT15M33S",\n  "description": "A step-by-step guide to setting up your first NLWeb instance.",\n  "transcript": "Welcome everyone. In this video, we'll be cloning the NLWeb repository..."\n}` },
        AudioObject: { type: 'AudioObject', essential: ['name', 'description', 'uploadDate', 'duration'], pro: ['transcript (CRITICAL)', 'partOfSeries (Podcasts)', 'byArtist'], icon: <Mic size={20} className="mr-2"/>, code: `{\n  "@context": "https://schema.org",\n  "@type": "AudioObject",\n  "name": "The Future of Web with NLWeb",\n  "partOfSeries": {"@type": "PodcastSeries", "name": "Tech Forward"},\n  "duration": "PT45M10S",\n  "transcript": "Today we're joined by an expert from Microsoft to discuss the agentic web..."\n}` }
    };
    const currentSchema = schemas[activeTab];

    return (
        <PageWrapper>
            <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">A Publisher's Implementation Playbook</h2>
            <p className="text-center text-slate-600 max-w-3xl mx-auto mb-12">This playbook outlines the key steps for implementing a conversational AI layer on your website. It's a strategic initiative that turns your content into a queryable, AI-ready asset.</p>
            <div className="space-y-12">
                <Card icon={<Database size={32} />} title="Step 1: Laying the Foundation - Data as a Product">
                    <p>The success of your project hinges on the quality of your structured data. This is the most critical investment. The goal is to treat your content's metadata not as an afterthought, but as a first-class editorial product.</p>
                    <p className="font-bold mt-2">Gold Standard: Comprehensive <Tooltip text="A standardized vocabulary for adding structured data to web pages, making them easier for machines to understand.">Schema.org</Tooltip> markup for all content types.</p>
                </Card>

                <div>
                    <h3 className="text-2xl font-bold text-center mb-6">Step 2: Creating the Blueprint - Content Schemas</h3>
                    <div className="w-full bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden">
                        <div className="border-b border-slate-200 flex overflow-x-auto">{Object.keys(schemas).map(key => <Tab key={key} label={key} activeTab={activeTab} setActiveTab={setActiveTab} />)}</div>
                        <div className="p-6">
                            <h4 className="text-lg font-bold text-indigo-700 mb-4 flex items-center">{currentSchema.icon} Schema: `{currentSchema.type}`</h4>
                            <div className="grid lg:grid-cols-2 gap-6">
                                <div>
                                    <h5 className="font-semibold mb-2">Essential Properties</h5>
                                    <ul className="list-disc list-inside space-y-1 text-slate-700">{currentSchema.essential.map(prop => <li key={prop}>`{prop}`</li>)}</ul>
                                    <h5 className="font-semibold mb-2 mt-4">High-Value "Pro" Properties</h5>
                                    <ul className="list-disc list-inside space-y-1 text-slate-700">{currentSchema.pro.map(prop => <li key={prop} className={prop.includes('CRITICAL') ? 'font-bold text-red-600' : ''}>`{prop}`</li>)}</ul>
                                </div>
                                <div>
                                     <h5 className="font-semibold mb-2">Example JSON-LD</h5>
                                     <CodeBlock language="json">{currentSchema.code}</CodeBlock>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Card icon={<Cpu size={32} />} title="Step 3: Connecting Content to AI with NLWeb">
                    <p>With your structured data in place, NLWeb acts as the engine that makes it "understandable" to a Large Language Model. It reads your content, uses an AI model to create numerical representations (embeddings) of its meaning, and stores them in a vector database for fast retrieval.</p>
                    <p className="mt-2">The following steps show you how to set up a prototype of this engine on your local machine to test and understand its capabilities.</p>
                </Card>

                <Card icon={<Code size={32} />} title="Step 4: Building the Prototype - Local Setup">
                    <p>This phase is for experimentation and understanding the system's behavior in a safe, local environment before committing to production infrastructure.</p>
                    <p><strong>1. Environment Setup:</strong> Clone the repo and install dependencies.</p>
                    <CodeBlock language="bash">{`git clone https://github.com/microsoft/NLWeb.git\ncd NLWeb\npython3 -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt`}</CodeBlock>
                    <p><strong>2. Configuration:</strong> Add your API keys to a `.env` file and configure your chosen services in the `config/` YAML files.</p>
                    <p><strong>3. Data Loading:</strong> Use the `db_load` tool to process your content and load it into your vector database.</p>
                    <CodeBlock language="bash">{`# Example loading from an RSS feed\npython3 -m tools.db_load https://yourwebsite.com/rss.xml YourSiteDataset`}</CodeBlock>
                     <p><strong>4. Launch and Test:</strong> Run the application server and open your browser.</p>
                     <CodeBlock language="bash">{`python3 app-file.py`}</CodeBlock>
                </Card>
                
                <Card icon={<RefreshCw size={32} />} title="Step 5: Staying Current - Real-Time Content Sync">
                    <p>For a news site, the speed of information is a competitive advantage. The AI's knowledge must be kept up-to-date. This requires automating the content ingestion process.</p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li><strong>Adding Content:</strong> The `db_load` script is designed to be idempotent—you can run it repeatedly without creating duplicate entries. To keep content fresh, automate this script (e.g., with a cron job) to run every few minutes, fetching your latest RSS feed.</li>
                        <li><strong>Removing/Updating Content:</strong> The base script does not handle content removal. If an article is retracted or updated, you must implement a separate process to delete the old content's vector from your database using its unique ID. Then, the `db_load` script can ingest the corrected version.</li>
                    </ul>
                </Card>

                <Card icon={<CheckSquare size={32} />} title="Step 6: Going Live - Production Checklist">
                    <p>Moving from a local prototype to a robust, scalable service for your users and other AI agents requires several key steps.</p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>Deploy the NLWeb application to a scalable **cloud server**.</li>
                        <li>Set up a robust, managed **vector database** for high availability.</li>
                        <li>Implement a **cron job** or other scheduler to automate the data ingestion script.</li>
                        <li>Secure your public `/api/ask` endpoint with rate limiting and monitoring.</li>
                        <li>Develop a custom, user-friendly **front-end interface** for your website.</li>
                    </ul>
                </Card>
            </div>
        </PageWrapper>
    );
};

const QuizPage = () => {
    const questions = [
        { question: "What is the primary problem that conversational AI frameworks like NLWeb aim to solve for publishers?", options: ["Slow website loading speeds.", "Losing traffic and control due to AI-driven search and summarization.", "Difficulty in creating new video content.", "High hosting costs."], answer: "Losing traffic and control due to AI-driven search and summarization.", explanation: "Frameworks like NLWeb are designed to help publishers reclaim agency in an era where AI assistants can bypass their websites." },
        { question: "What is the single most important prerequisite for a successful publisher-led conversational AI implementation?", options: ["A large marketing budget.", "A fast internet connection.", "High-quality, structured content (e.g., Schema.org or RSS).", "A team of 10+ developers."], answer: "High-quality, structured content (e.g., Schema.org or RSS).", explanation: "The quality of the conversational experience is directly dependent on the quality of the machine-readable data you provide." },
        { question: "According to the vision presented, what is the 'agentic web'?", options: ["A new version of the internet with faster speeds.", "A web primarily navigated by AI agents performing tasks on behalf of users.", "A social media platform for AI chatbots.", "A network exclusively for secure government communications."], answer: "A web primarily navigated by AI agents performing tasks on behalf of users.", explanation: "The agentic web is a paradigm shift where AI agents, not just humans, are the primary actors, performing complex tasks and research." },
        { question: "What new business model for publishers is enabled by open protocols in the agentic web?", options: ["Selling ad space inside chatbot responses.", "Allowing a user's AI agent to access subscribed content on their behalf.", "Charging users per question asked.", "Replacing journalists with AI writers."], answer: "Allowing a user's AI agent to access subscribed content on their behalf.", explanation: "Kevin Scott highlights a model where a user's subscription can be used by their AI agent, creating a direct value loop that respects publisher paywalls." },
        { question: "What is a primary strategic risk of adopting an emerging open protocol like MCP?", options: ["It is too slow for real-time news.", "It is not supported by major tech companies.", "It depends on broad, industry-wide adoption to be successful.", "It only works with video content."], answer: "It depends on broad, industry-wide adoption to be successful.", explanation: "As an emerging standard, the success and utility of MCP depend on it becoming a widely accepted 'lingua franca,' which carries inherent risk for early adopters." }
    ];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const handleAnswer = (option) => { setSelectedAnswer(option); setShowResult(true); if (option === questions[currentQuestion].answer) setScore(score + 1); };
    const handleNext = () => { if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowResult(false); } else { setCurrentQuestion(currentQuestion + 1); } };
    const handleReset = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); };

    if (currentQuestion >= questions.length) {
        return (
            <PageWrapper>
                <div className="text-center p-8 bg-white rounded-lg shadow-xl">
                    <h2 className="text-3xl font-bold mb-4">Assessment Complete!</h2>
                    <p className="text-xl mb-6">You scored <span className="font-bold text-indigo-600">{score}</span> out of {questions.length}</p>
                    <div className={`text-6xl mb-6 ${score / questions.length > 0.8 ? 'animate-bounce' : ''}`}>{score / questions.length > 0.8 ? '🎉' : '👍'}</div>
                    <p className="text-slate-600 max-w-md mx-auto mb-6">
                        {score / questions.length > 0.8 ? "Excellent! You have a strong grasp of both the strategic and technical concepts." : "Great start! You're on your way to understanding the key concepts of the agentic web."}
                    </p>
                    <button onClick={handleReset} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">Try Again</button>
                </div>
            </PageWrapper>
        );
    }
    const q = questions[currentQuestion];
    return (
        <PageWrapper>
            <h2 className="text-3xl font-bold text-center mb-2">Readiness Assessment</h2>
            <div className="w-full bg-slate-200 rounded-full h-2.5 mb-8 max-w-3xl mx-auto">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl mx-auto border border-slate-200">
                <p className="text-sm font-semibold text-indigo-600 mb-2">Question {currentQuestion + 1} of {questions.length}</p>
                <h3 className="text-xl font-semibold mb-6">{q.question}</h3>
                <div className="space-y-3">{q.options.map(option => (<button key={option} onClick={() => handleAnswer(option)} disabled={showResult} className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 text-slate-700 ${!showResult ? 'hover:bg-indigo-50 hover:border-indigo-400 cursor-pointer' : 'cursor-default'} ${showResult && option === q.answer ? 'bg-green-100 border-green-500 font-semibold' : ''} ${showResult && selectedAnswer === option && option !== q.answer ? 'bg-red-100 border-red-500' : 'border-slate-200'}`}>{option}</button>))}</div>
                {showResult && (<div className={`mt-6 p-4 rounded-lg ${selectedAnswer === q.answer ? 'bg-green-50' : 'bg-red-50'}`}><h4 className="font-bold text-lg mb-2 flex items-center">{selectedAnswer === q.answer ? <CheckCircle className="text-green-600 mr-2" /> : <XCircle className="text-red-600 mr-2" />}{selectedAnswer === q.answer ? 'Correct!' : 'Not Quite'}</h4><p className="text-slate-700">{q.explanation}</p><button onClick={handleNext} className="mt-4 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">{currentQuestion < questions.length -1 ? 'Next Question' : 'Finish Assessment'}</button></div>)}
            </div>
        </PageWrapper>
    );
};

const DemoPage = () => {
    const [messages, setMessages] = useState([{ from: 'bot', text: "Welcome! I'm the AI assistant for the 'Global News Network'. I can answer questions about our latest international news coverage. Try one of the prompts below or ask your own!" }]);
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, searching, typing
    const [lastTopic, setLastTopic] = useState(null);
    const messagesEndRef = useRef(null);
    const [activeTab, setActiveTab] = useState('Human');

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(scrollToBottom, [messages, status]);

    const mockResponses = {
        "innovate_summit": { text: "At the Innovate Summit 2025 in Geneva, the keynote by Dr. Aris Thorne focused on generative AI's role in scientific research. A major highlight was the announcement of 'Project Chimera,' a new open-source AI model for drug discovery.", sources: ["Innovate Summit 2025 Highlights AI Breakthroughs"] },
        "keynote_speaker": { text: "The keynote speaker at the Innovate Summit was Dr. Aris Thorne, a leading researcher in computational biology.", sources: ["Innovate Summit 2025 Highlights AI Breakthroughs"] },
        "supply_chain": { text: "A new report discussed this week finds that AI is significantly impacting global supply chains by improving demand forecasting and optimizing logistics, cutting costs by up to 15% for early adopters.", sources: ["AI Revolutionizes Global Supply Chains, Report Finds"] },
        "ai_impact": { text: "AI is having a major impact across industries. A recent report highlighted its role in optimizing global supply chains, while the Innovate Summit 2025 showcased new AI models for accelerating scientific research and drug discovery.", sources: ["AI Revolutionizes Global Supply Chains, Report Finds", "Innovate Summit 2025 Highlights AI Breakthroughs"] },
        "health": { text: "In global health news, the Global Vaccine Alliance announced it has secured an additional $5 billion in funding to support equitable vaccine distribution in developing nations, with a focus on new mRNA-based technologies.", sources: ["Global Vaccine Alliance Secures New Funding"] },
        "podcast": { text: "Yes, our 'Tech Forward Weekly' podcast featured a deep dive into the announcements from the Innovate Summit, including an interview with a panelist about the implications of 'Project Chimera'.", sources: ["Podcast: Tech Forward Weekly - The AI Revolution"] },
        "briefing": { text: "Here is your personalized briefing on AI and healthcare: The Innovate Summit in Geneva featured the announcement of 'Project Chimera,' an AI model for drug discovery. Separately, the Global Vaccine Alliance has secured $5 billion in new funding, partly to support new mRNA vaccine technologies.", sources: ["Innovate Summit 2025 Highlights AI Breakthroughs", "Global Vaccine Alliance Secures New Funding"] },
        "default": { text: "I can answer questions about the latest global news from the Global News Network. You can ask me about technology, international business, or global health initiatives.", sources: [] }
    };
    
    const suggestedPrompts = [
        { label: "Summarize", prompt: "Can you summarize the report on AI in supply chains?" },
        { label: "Deep Q&A", prompt: "What happened at the Innovate Summit?" },
        { label: "Personalize", prompt: "Create a briefing for me on AI and healthcare." }
    ];

    const handleSend = (text) => {
        if (!text.trim()) return;
        const userMessage = { from: 'user', text };
        setMessages(prev => [...prev, userMessage]);
        if(text === input) setInput('');
        setStatus('searching');

        setTimeout(() => {
            setStatus('typing');
            setTimeout(() => {
                const lowerInput = text.toLowerCase();
                let botResponse = mockResponses.default;
                let topic = null;

                if (lowerInput.includes('briefing')) {
                    botResponse = mockResponses.briefing;
                    topic = 'briefing';
                } else if (lowerInput.includes('innovate') || lowerInput.includes('summit')) {
                    botResponse = mockResponses.innovate_summit;
                    topic = 'tech';
                } else if ((lowerInput.includes('keynote') || lowerInput.includes('speaker')) && lastTopic === 'tech') {
                    botResponse = mockResponses.keynote_speaker;
                    topic = 'tech';
                } else if (lowerInput.includes('supply chain') || lowerInput.includes('logistics')) {
                    botResponse = mockResponses.supply_chain;
                    topic = 'business';
                } else if (lowerInput.includes('health') || lowerInput.includes('vaccine')) {
                    botResponse = mockResponses.health;
                    topic = 'health';
                } else if (lowerInput.includes('podcast')) {
                    botResponse = mockResponses.podcast;
                    topic = 'podcast';
                }
                
                const botMessage = { from: 'bot', ...botResponse };
                setMessages(prev => [...prev, botMessage]);
                setLastTopic(topic);
                setStatus('idle');
            }, 1000);
        }, 800);
    };
    
    const StatusIndicator = () => {
        if (status === 'idle') return null;
        
        let text = 'Typing...';
        if (status === 'searching') text = 'Searching articles...';

        return (
             <div className="flex items-end gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white flex-shrink-0"><Cpu size={16}/></div>
                <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-slate-200 text-slate-800 rounded-bl-none">
                    <div className="flex items-center space-x-1">
                        {status === 'typing' ? (
                            <>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-0"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></span>
                            </>
                        ) : (
                            <p className="text-sm text-slate-500 italic">{text}</p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <PageWrapper>
            <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Live Demo: Global News Network</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl border border-slate-200 flex flex-col h-[80vh]">
                <div className="border-b border-slate-200 flex">
                    <Tab label="Human Interaction" activeTab={activeTab} setActiveTab={setActiveTab} icon={<User size={16}/>} />
                    <Tab label="AI Agent Simulation" activeTab={activeTab} setActiveTab={setActiveTab} icon={<Bot size={16}/>} />
                </div>

                {activeTab === 'Human' ? (
                    <>
                        <div className="flex-1 p-6 overflow-y-auto">
                            <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex items-end gap-2 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                                        {msg.from === 'bot' && <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white flex-shrink-0"><Cpu size={16}/></div>}
                                        <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.from === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                            {msg.sources && msg.sources.length > 0 && (
                                                <div className="mt-3 pt-2 border-t border-slate-300">
                                                    <h4 className="text-xs font-bold text-slate-500 mb-1">Sources:</h4>
                                                    <div className="space-y-1">
                                                        {msg.sources.map(source => (
                                                            <button key={source} className="flex items-center text-xs text-indigo-600 hover:underline">
                                                                <Link size={12} className="mr-1.5"/> {source}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <StatusIndicator />
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-200">
                            {messages.length <= 1 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {suggestedPrompts.map(item => (
                                        <button key={item.label} onClick={() => handleSend(item.prompt)} className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1 rounded-full transition-colors"><strong>{item.label}:</strong> {item.prompt}</button>
                                    ))}
                                </div>
                            )}
                            <div className="flex items-center bg-white rounded-full border border-slate-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend(input)} placeholder="Ask about global news..." className="w-full bg-transparent p-3 pl-5 border-none focus:ring-0" />
                                <button onClick={() => handleSend(input)} className="m-1 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:bg-indigo-300" disabled={status !== 'idle' || !input.trim()}><Send size={20} /></button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 p-6 overflow-y-auto">
                        <p className="text-sm text-center text-slate-500 mb-4">This simulates how an AI agent programmatically uses your website's NLWeb endpoint to gather information for a user's request.</p>
                        <div className="space-y-4">
                            <div className="bg-slate-50 p-4 rounded-lg border">
                                <h3 className="font-bold text-slate-800 mb-2">AI Agent Task:</h3>
                                <p className="text-sm text-slate-600">Create a briefing on the economic impact of new AI regulations.</p>
                            </div>
                            
                            <div className="border p-4 rounded-lg">
                                <h4 className="font-semibold text-slate-700 mb-2">MCP Interaction Log:</h4>
                                <div className="border-b pb-2 mb-2">
                                    <p className="text-sm font-mono text-blue-600">AGENT: Sending request to Global News Network...</p>
                                    <CodeBlock language="json">{`{
  "method": "ask",
  "params": { "query": "What is the impact of AI on supply chains?" }
}`}</CodeBlock>
                                    <p className="text-sm font-mono text-green-600 mt-4">GNN: Receiving response...</p>
                                    <CodeBlock language="json">{`{
  "result": {
    "content": "AI is improving demand forecasting and optimizing logistics, cutting costs by up to 15% for early adopters.",
    "references": [{ "headline": "AI Revolutionizes Global Supply Chains..." }]
  }
}`}</CodeBlock>
                                </div>
                                <div>
                                    <p className="text-sm font-mono text-blue-600">AGENT: Sending follow-up request...</p>
                                    <CodeBlock language="json">{`{
  "method": "ask",
  "params": { "query": "What happened at the Innovate Summit?" }
}`}</CodeBlock>
                                    <p className="text-sm font-mono text-green-600 mt-4">GNN: Receiving response...</p>
                                    <CodeBlock language="json">{`{
  "result": {
    "content": "The summit focused on generative AI for scientific research and announced 'Project Chimera,' an AI model for drug discovery.",
    "references": [{ "headline": "Innovate Summit 2025 Highlights..." }]
  }
}`}</CodeBlock>
                                </div>
                            </div>

                             <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                                <h3 className="font-bold text-indigo-800 mb-2">Agent's Synthesis & Final Summary:</h3>
                                <p className="text-sm text-indigo-700 mb-2">After processing the responses, the agent synthesizes the information to provide a complete answer to the user:</p>
                                <div className="bg-white p-3 rounded">
                                    <p className="text-sm text-slate-800">"New AI regulations could have a dual economic impact. While AI is driving significant cost savings in areas like supply chain logistics, new developments in specialized AI for sectors like scientific research are also accelerating innovation."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};


// --- Main App Component ---

export default function App() {
    const [page, setPage] = useState('Home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = [
        { id: 'Home', label: 'Home', icon: <Home size={20} /> },
        { id: 'Why', label: "The 'Why'", icon: <Lightbulb size={20} /> },
        { id: 'BigPicture', label: 'The Big Picture', icon: <Globe size={20} /> },
        { id: 'Architecture', label: 'Architecture', icon: <Cpu size={20} /> },
        { id: 'MCP', label: 'MCP Protocol', icon: <Share2 size={20} /> },
        { id: 'KeyFeatures', label: 'Key Features', icon: <LayoutList size={20} /> },
        { id: 'UseCases', label: 'Use Cases', icon: <TrendingUp size={20} /> },
        { id: 'Strategy', label: 'Strategy & Risks', icon: <ShieldAlert size={20} /> },
        { id: 'Infrastructure', label: 'Infrastructure', icon: <Server size={20} /> },
        { id: 'Implementation', label: 'Implementation', icon: <Code size={20} /> },
        { id: 'Demo', label: 'Live Demo', icon: <MessageSquare size={20} /> },
        { id: 'Quiz', label: 'Readiness Assessment', icon: <Puzzle size={20} /> },
    ];

    const renderPage = () => {
        switch (page) {
            case 'Why': return <WhyPage />;
            case 'BigPicture': return <BigPicturePage />;
            case 'Architecture': return <ArchitecturePage />;
            case 'MCP': return <MCPPage />;
            case 'KeyFeatures': return <KeyFeaturesPage />;
            case 'UseCases': return <UseCasesPage />;
            case 'Strategy': return <StrategyPage />;
            case 'Infrastructure': return <InfrastructurePage />;
            case 'Implementation': return <ImplementationPage />;
            case 'Demo': return <DemoPage />;
            case 'Quiz': return <QuizPage />;
            case 'Home': default: return <HomePage setPage={setPage} />;
        }
    };
    
    const NavLink = ({ item }) => (
         <button onClick={() => { setPage(item.id); setIsMenuOpen(false); }} className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${ page === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'}`}>
            {item.icon}<span>{item.label}</span>
        </button>
    );

    return (
        <>
            <style>{`.animate-fadeIn { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
                <div className="flex flex-col md:flex-row">
                    <header className="md:hidden bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-30">
                        <div className="flex items-center space-x-2"><BookOpen className="text-indigo-600" /><span className="font-bold text-lg">The Publisher's Guide...</span></div>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700 p-1 rounded-md hover:bg-slate-100">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
                    </header>
                    <aside className={`fixed md:relative top-0 left-0 h-full bg-white border-r border-slate-200 z-20 p-5 transition-transform transform ${isMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} md:translate-x-0 md:w-64 flex-shrink-0`}>
                        <div className="flex items-center space-x-3 mb-8 px-2"><Globe size={32} className="text-indigo-600" /><h1 className="text-xl font-bold text-slate-800">The Publisher's Guide to the Agentic Web</h1></div>
                        <nav className="space-y-2">{navItems.map(item => <NavLink key={item.id} item={item} />)}</nav>
                    </aside>
                    <main className="flex-1 p-4 sm:p-6 md:p-10 transition-all duration-300">{renderPage()}</main>
                </div>
            </div>
        </>
    );
}
