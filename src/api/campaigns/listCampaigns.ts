import ICampaign from '@/interfaces/ICampaign'

/**
 * This method is a stubbing method for a non-existant API behind it. It returns
 * a dummy list of campaigns as a promise that can be resolved just like an API
 * call done via HTTP.
 * 
 * @returns A list of campaigns to display.
 */
export default function listCampaigns(): Promise<Array<ICampaign>> {
  return new Promise((resolve: any, reject: any) => {
    setTimeout(() => {
      resolve([{name: 'My campaign'}])
    }, 1000)
  });
}