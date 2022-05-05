const test = require('tape')
const RulesFetcher = require('../rulesFetcher')

test('RulesFetcher', async (t) => {
  /* const fetcher = new RulesFetcher('123')
  fetcher.octokit = {
    request: async (str) => {
      if (str.indexOf('GET /repos/') === 0) {
        const response = {
          commit: {
            author: {
              name: 'inkz',
              email: 'inkz@email.com',
              date: '2022-04-26T19:10:32Z'
            }
          },
          author: {
            login: 'inkz',
            id: 12345,
            avatar_url: 'https://avatars.githubusercontent.com/u/14846866?v=4',
            html_url: 'https://github.com/inkz'
          },
          files: [
            {
              sha: '519b27487219960bf02bf75dcb86147c81554b4a',
              filename: 'go/lang/security/audit/net/fs-directory-listing.yaml',
              status: 'added',
              additions: 40,
              deletions: 0,
              changes: 40,
              blob_url: 'https://github.com/returntocorp/semgrep-rules/blob/f17297de260b4ee805aa8ff4ba7c612c1aa3e607/go%2Flang%2Fsecurity%2Faudit%2Fnet%2Ffs-directory-listing.yaml',
              raw_url: 'https://github.com/returntocorp/semgrep-rules/raw/f17297de260b4ee805aa8ff4ba7c612c1aa3e607/go%2Flang%2Fsecurity%2Faudit%2Fnet%2Ffs-directory-listing.yaml',
              contents_url: 'https://api.github.com/repos/returntocorp/semgrep-rules/contents/go%2Flang%2Fsecurity%2Faudit%2Fnet%2Ffs-directory-listing.yaml?ref=f17297de260b4ee805aa8ff4ba7c612c1aa3e607'
            }
          ]
        }
        return { data: response }
      } else if (str.indexOf('GET /users/') === 0) {
        return { data: [] }
      }
    }
  } */
  t.equal(1, 1)
  t.end()
})
