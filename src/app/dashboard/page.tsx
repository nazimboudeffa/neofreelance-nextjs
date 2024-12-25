"use client"
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import JobListItem from "@/components/JobListItem";

interface Job {
    _id: number;
    title: string;
    description: string;
    company: string;
    type: string;
    location: string;
    salary: number;
    createdAt: Date;
}

function Dashboard() {
    const { data: session } = useSession();
    const [userJobs, setUserJobs] = useState<Job[]>([]);

    useEffect(() => {
        // Log the entire session object for debugging
        console.log('Full Session Object:', session);
        console.log('Session User:', session?.user);

        if (!session) {
            redirect('/');
            return;
        }

        // Ensure session.user exists and has an ID before fetching
        if (!session?.user?.id) {
            console.error('No user ID found in session');
            console.error('Session Details:', JSON.stringify(session, null, 2));
            return;
        }

        // Fetch jobs posted by the current user
        const fetchUserJobs: () => Promise<Job[]> = async () => {
            const response = await fetch('/api/dashboard/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            // Log the entire response for debugging
            console.log('API Response:', data);

            // Check if response is successful and has jobs
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch jobs');
            }

            // Ensure jobs is an array, default to empty array if undefined
            return data.jobs || [];
        };

        fetchUserJobs()
        .then(jobs => {
            console.log('Fetched Jobs:', jobs);
            setUserJobs(jobs);
        })
        .catch(error => {
            console.error('Error fetching user jobs:', error);
            // Optionally set an error state or show a user-friendly message
            setUserJobs([]); // Prevent undefined errors
        });
    }, [session]);

    if (!session) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Mes Offres Publiées</h1>
                <Button>
                    <Link href="/jobs/new">Publier une nouvelle offre</Link>
                </Button>
            </div>

            {userJobs.length === 0 ? (
                <p className="text-center text-gray-500">
                    Vous n'avez pas encore publié d'offres d'emploi.
                </p>
            ) : (
                <div className="space-y-4">
                    {userJobs.map((job) => (
                        <JobListItem 
                            key={job._id} 
                            job={job}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard