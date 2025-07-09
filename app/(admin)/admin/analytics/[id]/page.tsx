"use client";

import { MovieInterface } from "@/lib/interface";
import apiClient from "@/lib/service/api-client";
import videoService from "@/lib/service/video-service";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import StatusCard from "@/components/app-card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  params: Promise<{ id: string }>;
}

export default function AnalyticsPage({ params }: Props) {
  const [movie, setMovie] = useState<MovieInterface>();
  const [movieStatus, setMovieStatus] = useState<{
    videoId: string;
    today: number;
    week: number;
    month: number;
    total: number;
  }>();
  const { id: videoId } = use(params);

  useEffect(() => {
    const { cancel, request } = videoService.get<MovieInterface>(videoId);

    request.then(({ data }) => setMovie(data));

    apiClient
      .get(`/video/${videoId}/views`)
      .then(({ data }) => setMovieStatus(data));

    return () => cancel();
  }, [videoId]);

  console.log(movieStatus);

  return (
    <div className="flex flex-col p-5 space-y-6">
      {/* Movie Header */}
      {movie && (
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <Image
            src={movie.thumbnail}
            alt={movie.title}
            width={160}
            height={90}
            className="rounded-md"
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {movie.title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Category: {movie.category}
            </p>
          </div>
        </div>
      )}

      {/* Status Cards */}
      {movieStatus && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatusCard
            title="Views Today"
            total={movieStatus.today}
            color="green"
          />
          <StatusCard
            title="Views This Week"
            total={movieStatus.week}
            color="blue"
          />
          <StatusCard
            title="Views This Month"
            total={movieStatus.month}
            color="purple"
          />
          <StatusCard
            title="Total Views"
            total={movieStatus.total}
            color="red"
          />
        </div>
      )}

      {/* View Distribution Chart */}
      {movieStatus && (
        <div className="w-full p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            View Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { name: "Today", value: movieStatus.today },
                { name: "Week", value: movieStatus.week },
                { name: "Month", value: movieStatus.month },
                { name: "Total", value: movieStatus.total },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
