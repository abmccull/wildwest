# Agent Assignment Matrix for SEO Project

## Specialist Agent Roster & Capabilities

### 1. Error Analysis Agent
**Specialization**: 404 detection, broken link analysis, crawl error diagnosis
**Assigned Tasks**:
- Crawl entire site to identify 404 pages
- Categorize errors by type (deleted, moved, never existed)
- Generate comprehensive error report
**Tools Required**: Crawler, HTTP status checker, log analyzer
**Output**: `404_ERROR_REPORT.json` with all broken URLs and suggested fixes
**Timeline**: 2-4 hours

---

### 2. Redirect Implementation Agent  
**Specialization**: URL mapping, 301/302 redirects, regex patterns
**Assigned Tasks**:
- Create redirect map from old URLs to new
- Implement redirects in middleware.ts
- Test all redirect chains
**Dependencies**: Error Analysis Agent output
**Output**: Updated `middleware.ts` with redirect rules
**Timeline**: 4-6 hours

---

### 3. URL Strategy Agent
**Specialization**: Information architecture, URL structure, SEO-friendly paths
**Assigned Tasks**:
- Analyze current URL patterns
- Define canonical URL structure
- Create URL rewriting rules
**Output**: `URL_STRUCTURE_SPECIFICATION.md`
**Timeline**: 3-4 hours

---

### 4. SEO Content Agent
**Specialization**: Meta tag generation, keyword optimization, content uniqueness
**Assigned Tasks**:
- Generate unique meta descriptions for all pages
- Create title tag templates
- Optimize heading structure
**Tools Required**: Content analyzer, keyword research tools
**Output**: `META_TAGS_DATABASE.json` with all meta content
**Timeline**: 8-10 hours

---

### 5. Schema Implementation Agent
**Specialization**: Structured data, JSON-LD, Schema.org markup
**Assigned Tasks**:
- Implement LocalBusiness schema
- Add Service schema for each offering
- Create Article schema for blog posts
- Add BreadcrumbList schema
**Output**: Schema components in `/components/schema/`
**Timeline**: 6-8 hours

---

### 6. Link Architecture Agent
**Specialization**: Internal linking, PageRank flow, site structure
**Assigned Tasks**:
- Design internal linking matrix
- Identify orphan pages
- Create link equity distribution plan
**Output**: `INTERNAL_LINKING_MATRIX.csv`
**Timeline**: 4-5 hours

---

### 7. Performance Agent
**Specialization**: Core Web Vitals, page speed, resource optimization
**Assigned Tasks**:
- Optimize LCP, FID, CLS
- Implement resource hints (preload, prefetch)
- Minimize JavaScript execution time
**Tools Required**: Lighthouse, WebPageTest
**Output**: Performance optimization patches
**Timeline**: 10-12 hours

---

### 8. Content Generation Agent
**Specialization**: Programmatic SEO, content templates, dynamic generation
**Assigned Tasks**:
- Create location-service page templates
- Generate unique content for 1000+ pages
- Implement dynamic content blocks
**Output**: Generated pages in `/app/locations/[city]/[service]/`
**Timeline**: 12-15 hours

---

### 9. Content Audit Agent
**Specialization**: Duplicate detection, content quality, uniqueness analysis
**Assigned Tasks**:
- Identify duplicate content
- Find thin content pages
- Suggest content improvements
**Output**: `CONTENT_AUDIT_REPORT.md`
**Timeline**: 4-6 hours

---

### 10. Analytics Agent
**Specialization**: Tracking setup, conversion monitoring, user behavior
**Assigned Tasks**:
- Set up Google Search Console
- Implement event tracking
- Create conversion funnels
**Output**: Analytics configuration files
**Timeline**: 3-4 hours

---

## Parallel Execution Schedule

### Day 1-2: Foundation Team
**Active Agents**: 
- Error Analysis Agent (Track A)
- URL Strategy Agent (Track B)
- Content Audit Agent (Track C)

**Coordination Points**:
- Hour 4: Error Analysis shares initial findings
- Hour 8: URL Strategy proposes structure
- EOD: All reports compiled for review

---

### Day 3-4: Implementation Team Alpha
**Active Agents**:
- Redirect Implementation Agent (Track A)
- SEO Content Agent (Track B) 
- Schema Implementation Agent (Track C)

**Coordination Points**:
- Morning sync: Review foundation team outputs
- Midday: Test redirect implementation
- EOD: Deploy first batch of changes

---

### Day 5-7: Implementation Team Beta
**Active Agents**:
- Link Architecture Agent (Track A)
- Performance Agent (Track B)
- Content Generation Agent - Setup (Track C)

**Coordination Points**:
- Daily: Performance impact assessments
- Review: Link architecture proposals
- Prep: Content generation templates

---

### Day 8-10: Scale Team
**Active Agents**:
- Content Generation Agent - Full (Track A)
- Performance Agent - Optimization (Track B)
- Analytics Agent (Track C)

**Coordination Points**:
- Batch deployments every 4 hours
- Performance monitoring continuous
- Analytics validation checkpoints

---

## Agent Handoff Protocol

### Standard Handoff Format:
```json
{
  "from_agent": "Agent Name",
  "to_agent": "Next Agent",
  "timestamp": "ISO 8601",
  "deliverables": ["file1.ext", "file2.ext"],
  "status": "complete|partial|blocked",
  "notes": "Additional context",
  "next_actions": ["Required action 1", "Required action 2"]
}
```

### Critical Handoff Points:

1. **Error Analysis → Redirect Implementation**
   - Deliverable: Complete 404 list with categorization
   - Format: JSON with old_url, suggested_new_url, priority
   
2. **URL Strategy → All Content Agents**
   - Deliverable: Canonical URL patterns
   - Format: Regex patterns and examples
   
3. **Content Audit → Content Generation**
   - Deliverable: Gaps and opportunities report
   - Format: Prioritized list of pages to create
   
4. **Performance → Deployment**
   - Deliverable: Performance baseline and targets
   - Format: Lighthouse reports before/after

---

## Quality Gates

### Gate 1: Foundation Complete (Day 2)
**Required Before Proceeding**:
- ✓ All 404s documented
- ✓ URL structure defined
- ✓ Content audit complete
**Approval**: Project Orchestrator

### Gate 2: Core Implementation (Day 5)
**Required Before Proceeding**:
- ✓ Redirects tested and live
- ✓ Meta descriptions deployed
- ✓ Schema markup validated
**Approval**: Technical Lead + Orchestrator

### Gate 3: Scale Ready (Day 8)
**Required Before Proceeding**:
- ✓ Performance benchmarks met
- ✓ Internal linking implemented
- ✓ Content templates approved
**Approval**: Full team consensus

### Gate 4: Launch Ready (Day 12)
**Required Before Proceeding**:
- ✓ 500+ pages generated and validated
- ✓ Monitoring in place
- ✓ Rollback plan documented
**Approval**: Stakeholder sign-off

---

## Resource Allocation

### Compute Resources:
- **High Priority**: Content Generation Agent (needs parallel processing)
- **Medium Priority**: Performance Agent (needs testing environments)
- **Low Priority**: Documentation agents

### API Limits:
- Search Console API: 200 requests/minute
- PageSpeed API: 2 requests/second
- Crawler: Respect 1 second delay between requests

### File System:
- Generated content: `/app/locations/[city]/[service]/`
- Schema components: `/components/schema/`
- Reports: `/reports/seo/`
- Backups: `/backups/[date]/`

---

## Escalation Matrix

### Level 1: Agent-to-Agent
- Timeout: 1 hour
- Resolution: Direct communication via handoff protocol

### Level 2: Team Lead
- Timeout: 2 hours
- Issues: Blocking dependencies, resource conflicts

### Level 3: Project Orchestrator
- Timeout: 4 hours
- Issues: Scope changes, quality gate failures

### Level 4: Stakeholder
- Timeout: Same day
- Issues: Budget overruns, timeline risks, major pivots

---

## Success Metrics Per Agent

| Agent | Primary KPI | Target | Measurement |
|-------|------------|--------|-------------|
| Error Analysis | 404s Found | 100% | Crawl coverage |
| Redirect Implementation | Success Rate | 100% | HTTP status codes |
| URL Strategy | Structure Compliance | 100% | Regex matching |
| SEO Content | Unique Descriptions | 100% | Duplication check |
| Schema Implementation | Validation Rate | 100% | Google Rich Results Test |
| Link Architecture | Orphan Pages | 0 | Crawl analysis |
| Performance | Core Web Vitals | All Good | Lighthouse scores |
| Content Generation | Pages Created | 1000+ | File count |
| Content Audit | Duplicate Content | <5% | Similarity analysis |
| Analytics | Tracking Coverage | 100% | Tag firing rate |

---

## Communication Channels

### Primary: Slack Integration
- `#seo-agents-general` - All agent updates
- `#seo-agents-blockers` - Urgent issues
- `#seo-agents-deploy` - Deployment notifications

### Secondary: Status Dashboard
- Real-time agent status
- Task completion percentage
- Blocker alerts
- Performance metrics

### Documentation: Git Repository
- All agent outputs committed
- Version control for changes
- Pull requests for review
- Automated testing on commits

---

*Matrix Compiled: 2025-08-14*
*Orchestrator: SEO Project Manager*
*Next Review: Day 3 Checkpoint*