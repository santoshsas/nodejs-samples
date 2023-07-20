/**
 * This file runs code to look for appointments on API and then parse response to finds timeslots available for requitred location.
 */
import {config} from './config.js'
import cron from 'node-cron'
import { inHHMMSS } from './util.js'
import { checkAvailability } from "./checkAvailability.js"

const cronJob = () => {
    checkAvailability(config)
    .then(status => {
                        console.log(`Checking avalibity ${status} at ${inHHMMSS(new Date())}` )
                    }
         ).catch(err => console.error(err))
}

const job = cron.schedule(config.frequency,cronJob, { scheduled : false })// scheduled
job.start()
job.now() // Executing immediately after scheduling is complete


